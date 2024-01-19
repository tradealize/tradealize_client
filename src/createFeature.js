const fs = require("fs");
const path = require("path");

// revisar context e implementar los servicios

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const createTypes = (entityName) => {
  const content = `
  export const ${entityName.toUpperCase()}S_RECEIVED = "${entityName.toUpperCase()}S_RECEIVED";
  export const SET_${entityName.toUpperCase()} = "SET_${entityName.toUpperCase()}";
  export const CREATE_${entityName.toUpperCase()} = "CREATE_${entityName.toUpperCase()}";
  export const SET_PROPERTY_${entityName.toUpperCase()} = "SET_PROPERTY_${entityName.toUpperCase()}";
  `;

  fs.writeFileSync(`./src/types/${entityName}s.js`, content);
};

const createContext = (entityName) => {
  const content = `
import React, { createContext, useReducer, useContext } from 'react';
import ${capitalize(entityName)}sService from '../services/${capitalize(
    entityName
  )}sService';
import ${capitalize(entityName)}sReducer from '../reducers/${capitalize(
    entityName
  )}sReducer';
import {
  ${entityName.toUpperCase()}S_RECEIVED,
  SET_${entityName.toUpperCase()},
  CREATE_${entityName.toUpperCase()},
  SET_PROPERTY_${entityName.toUpperCase()},
} from "../types/${entityName}s";
import { ModalContext } from './ModalContext';
import { HIDE_SPINNER, SHOW_SPINNER } from "../types";

const initialState = {
  ${entityName}s: null,
  ${entityName}: null,
};

export const ${capitalize(entityName)}sContext = createContext(initialState);

export const ${capitalize(entityName)}sProvider = ({ children }) => {
  const [state, dispatch] = useReducer(${capitalize(
    entityName
  )}sReducer, initialState);

  const { alert, success, clearModal } = useContext(ModalContext);

  const get${capitalize(entityName)}s = () => {
    ${capitalize(entityName)}sService.get${capitalize(entityName)}s()
      .then((response) => {
        const { ${entityName}s } = response.data;
        dispatch({ type: ${entityName.toUpperCase()}S_RECEIVED, payload: ${entityName}s });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getSingle${capitalize(entityName)} = (${entityName}_id) => {
    ${capitalize(entityName)}sService.getSingle${capitalize(
    entityName
  )}(${entityName}_id)
      .then((response) => {
        const { ${entityName} } = response.data;
        dispatch({ type: SET_${entityName.toUpperCase()}, payload: ${entityName} });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const set${capitalize(entityName)} = (${entityName}) => {
    dispatch({ type: SET_${entityName.toUpperCase()}, payload: ${entityName} });
  };

  const create${capitalize(entityName)} = () => {
    dispatch({ type: CREATE_${entityName.toUpperCase()} });
  };

  const setProperty${capitalize(entityName)} = (key, value) => {
    dispatch({ type: SET_PROPERTY_${entityName.toUpperCase()}, payload: { key, value } });
  };

  const save${capitalize(entityName)} = (${entityName}, callback) => {
      dispatch({ type: SHOW_SPINNER });
      let service = ${capitalize(entityName)}sService.put${capitalize(
    entityName
  )};
      if(isNaN(parseInt(${entityName}.${entityName}_id))) {
        service = ${capitalize(entityName)}sService.post${capitalize(
    entityName
  )};
      }
      service(${entityName}).then(() => {
        success("${capitalize(entityName)} saved.");
        dispatch({ type: HIDE_SPINNER });
        clearModal();
        if(typeof callback === "function") {
          callback();
        }
      })
      .catch((error) => {
        dispatch({ type: HIDE_SPINNER });
        alert(error);
      });
  };

  const delete${capitalize(entityName)} = (${entityName}_id, callback) => {
     dispatch({ type: SHOW_SPINNER });
    ${capitalize(entityName)}sService.delete${capitalize(
    entityName
  )}(${entityName}_id).then(() => {
      success("${capitalize(entityName)} deleted.");
      dispatch({ type: HIDE_SPINNER });
      clearModal();
      if(typeof callback === "function") {
        callback();
      }
    }).catch(error => {
      dispatch({ type: HIDE_SPINNER });
      alert(error);
    })
  };

 

  return (
    <${capitalize(entityName)}sContext.Provider
    value={{
      ...state,
      set${capitalize(entityName)},
      get${capitalize(entityName)}s,
      save${capitalize(entityName)},
      delete${capitalize(entityName)},
      create${capitalize(entityName)},
      getSingle${capitalize(entityName)},
      setProperty${capitalize(entityName)},

    }}
  >
    {children}
  </${capitalize(entityName)}sContext.Provider>
);
};
`;

  fs.writeFileSync(
    `./src/context/${capitalize(entityName)}sContext.js`,
    content
  );
};

const createReducer = (entityName) => {
  const content = `
import {
  SET_${entityName.toUpperCase()},
  CREATE_${entityName.toUpperCase()},
  ${entityName.toUpperCase()}S_RECEIVED,
  SET_PROPERTY_${entityName.toUpperCase()},
} from "../types/${entityName}s";

const schema = {

}

const ${entityName}sReducer = (state, { type, payload }) => {
  switch (type) {
    case ${entityName.toUpperCase()}S_RECEIVED:
      return { ...state, ${entityName}s: payload };
    case SET_${entityName.toUpperCase()}:
      return { ...state, ${entityName}: payload };
    case CREATE_${entityName.toUpperCase()}:
      return { ...state, ${entityName}: schema };
    case SET_PROPERTY_${entityName.toUpperCase()}: {
      const { key, value } = payload;
      const ${entityName} = { ...state.${entityName} };
      ${entityName}[key] = value;
      return { ...state, ${entityName} };
    }
    default:
      return { ...state};
  }
};

export default ${entityName}sReducer;
`;

  fs.writeFileSync(
    `./src/reducers/${capitalize(entityName)}sReducer.js`,
    content
  );
};

const createService = (entityName) => {
  const content = `
import api from './api';

const route = '/${entityName}s';

export default {
  get${capitalize(entityName)}s: () => api.get(route),
  getSingle${capitalize(
    entityName
  )}: (${entityName}_id) => api.get(\`\${route}/\${${entityName}_id}\`),
  post${capitalize(
    entityName
  )}: (${entityName}) => api.post(route, { ...${entityName}}),
  put${capitalize(
    entityName
  )}: (${entityName}) => api.put(route, { ...${entityName}}),
  delete${capitalize(entityName)}: (${capitalize(
    entityName
  )}) => api.delete(\`\${route}/\${${capitalize(entityName)}}\`),
};
`;

  fs.writeFileSync(
    `./src/services/${capitalize(entityName)}sService.js`,
    content
  );
};

const generateFeature = (entityName) => {
  createDirIfNotExists("./types");
  createDirIfNotExists("./context");
  createDirIfNotExists("./reducers");
  createDirIfNotExists("./services");

  createTypes(entityName);
  createContext(entityName);
  createReducer(entityName);
  createService(entityName);
};

if (process.length < 3) {
  console.error("Por favor, ingrese el nombre de una entidad.");
  process.exit(1);
}

const entityName = process.argv[2];

generateFeature(entityName);
console.log(`Feature '${entityName}' creada exitosamente.`);
