import moment from "moment";
import { Capacitor } from "@capacitor/core";
import HTMLReactParser from "html-react-parser";

export const GOOGLE_MAPS_KEY = "AIzaSyB1_z-LAuj8jaIGe-79RrszDyoQxru_ZpU";

export const stripe_test_key =
  "pk_test_51KTpLAI8NRGj253PovVqx2VZ7P8e6wMWWzbU4CsgzZvTPxero1C10xJO6OcibfOUArFBfhxD1qO5cvJbxdNfHWyt00n5dJOHgP";

export const stripe_live_key =
  "pk_live_51KTpLAI8NRGj253P12Pd4GUSBDKc8wvz3YIPmw0Ct60jsL7oF238H3Nz3uI3J4hM5QPTPjyk7QuQh101cmOy48RL00HKzyjYkX";

export const STRIPE_KEY =
  process.env.NODE_ENV === "development" ? stripe_test_key : stripe_live_key;

export const BASE_URL =
  process.env.NODE_ENV === "development" && Capacitor.getPlatform() === "web"
    ? "http://localhost:4000"
    : "";

export const API_URL = BASE_URL + "/api";

export const S3_ENDPOINT = API_URL + "/files";

export const searchRows = (query, rows) => {
  if (!rows) return;
  if (isNaN(query)) query = query.toLowerCase();
  let searchResult = rows.filter((row) => {
    let result = Object.keys(row).filter((column) => {
      if (Array.isArray(row[column])) {
        return row[column].filter((subcolumn) => {
          if (isNaN(subcolumn)) {
            if (subcolumn.toLowerCase().includes(query)) return row;
          } else if (subcolumn === query) return row;
          return null;
        });
      }
      if (isNaN(row[column])) {
        if (String(row[column]).toLowerCase().includes(query)) {
          return row;
        }
      } else if (String(row[column]) === query) {
        return row;
      } else if (Number(row[column]) === Number(query)) {
        return row;
      }
      return null;
    });
    return result.length > 0;
  });
  return searchResult;
};

export const getArgs = (args) => {
  if (args && args !== null) {
    const array = Object.keys(args)
      .map((key) => {
        if (args[key] && args[key] !== null && args[key] !== "") {
          return `${key}=${args[key]}`;
        }
        return null;
      })
      .filter((arg) => arg !== null);
    if (array.length > 0) {
      return `${array.join("&")}`;
    }
  }
  return "";
};

export const calcularTotal = (productos) => {
  if (productos && productos !== null) {
    let total = 0;
    productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  }
  return 0;
};

export function formatMonto(monto) {
  if (monto === null) return "-";
  monto = parseFloat(monto);
  if (!monto || monto === null || isNaN(monto)) monto = 0;
  return numberWithCommas(monto);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const hideModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  }
};

export const showModal = () => {
  const button = document.getElementById("main-button");
  if (button && button !== null) {
    button.click();
  } else {
    const newButton = document.createElement("button");
    newButton.attributes.href = "#modal";
    newButton.id = "main-button";
    newButton.setAttribute("data-toggle", "modal");
    newButton.setAttribute("data-target", "#modal");
    newButton.setAttribute("data-bs-toggle", "modal");
    newButton.setAttribute("data-bs-target", "#modal");
    newButton.style.visibility = "hidden";
    document.body.appendChild(newButton);
    newButton.click();
  }
};

export const misclases = [
  {
    name: "Online",
    handle: "/mypanel/online",
  },
  {
    name: "Presenciales",
    handle: "/mypanel/presenciales",
  },
];

export const shop = [
  {
    name: "Clases",
    handle: "/mypanel/shop",
  },
  {
    name: "Merch",
    handle: "/mypanel/merch",
  },
];

export const cuenta = [
  {
    name: "Mi Información",
    handle: `/mypanel/informacion`,
  },
  {
    name: "Mis Métodos de Pago",
    handle: `/mypanel/metodos-pago`,
  },
  {
    name: "Mis Compras",
    handle: `/mypanel/pagos`,
  },
];

export const cardStyle = {
  style: {
    base: {
      color: "#333",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#333",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getCardType = (number) =>
  String(number) === "3"
    ? "amex"
    : String(number) === "4"
    ? "visa"
    : "mastercard";

export const categories = {
  dance: [11, 12, 13, 15],
  workout: [14, 15],
  presenciales: [11742, 11743, 11744, 11745],
};

export const getCompradasPresenciales = (paquetes) => {
  const package_ids = categories.presenciales;
  const customer_classes = paquetes.filter((class_category) =>
    package_ids.includes(class_category.package_class_id)
  );
  let total = 0;
  customer_classes.forEach((purchase) => {
    total += purchase.available_class;
  });
  return total;
};

export const getVigencia = (handle, user) => {
  const paquete = user.vigencias.find(
    (class_category) => class_category.handle === handle
  );
  if (paquete) return paquete.expiration;
};

export const isManager = (user) => {
  return user.isManager !== null && user.isManager;
};

export const isAdmin = (user) => {
  return user.isAdmin !== null && user.isAdmin;
};

export const isCoach = (user) => {
  return user.instructor_id !== null && user.instructor_id;
};

export const getLocalMoment = (datetime) => {
  return moment(
    moment(datetime).utc().format("YYYY-MM-DD HH:mm:ss"),
    "YYYY-MM-DD HH:mm:ss"
  );
};

export const getClassAvailableSpaces = (singleClass) => {
  return singleClass.capacity - singleClass.class_reservations.length;
};

export const userInformatinCompleted = (user) => {
  let valid = true;
  if (String(user.phone).length < 10) valid = false;
  if (user.last_name === "" || user.last_name === null) valid = false;
  return valid;
};

export const getLocalMomentDiff = (datetime, unitOfTime) => {
  return moment().diff(getLocalMoment(datetime), unitOfTime);
};

export const hasNotch = (device) => {
  let current = String(device);
  if (current.includes("iPhone")) {
    return (
      current.includes("X") ||
      current.includes("11") ||
      current.includes("12") ||
      current.includes("13") ||
      current.includes("14") ||
      current.includes("15")
    );
  }
};

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const getBilling = (class_package) => {
  const { is_subscription, subscription_period, subscription_interval } =
    class_package;
  let period = subscription_period;
  let interval = subscription_interval;
  if (is_subscription) {
    if (subscription_interval > 1) {
      period =
        subscription_period === "month"
          ? "meses"
          : subscription_period === "year"
          ? "años"
          : "días";
    } else {
      period =
        subscription_period === "month"
          ? "mes"
          : subscription_period === "year"
          ? "año"
          : "día";
    }
  }
  let frequency = "cada ";
  if (interval === 1) {
    interval = "";
  }
  return `${frequency} ${interval} ${period}`;
};

export const showOffcanvas = () => {
  let offcanvas = document.getElementsByClassName("offcanvas")[0];
  if (offcanvas && offcanvas !== null) {
    offcanvas.classList.add("show");
  }
};

export const hideOffcanvas = () => {
  let offcanvas = document.getElementsByClassName("offcanvas")[0];
  let backdrop = document.getElementsByClassName("offcanvas-backdrop")[0];
  if (offcanvas && offcanvas !== null) {
    offcanvas.classList.remove("show");
    document.body.style = "";
    if (backdrop && backdrop !== null) {
      backdrop.remove();
    }
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePhoneNumber = (input_str) => {
  var re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
  return re.test(input_str);
};

export const getValue = (object, key, type) => {
  if (object && object !== null) {
    const value = object[key];
    if (value && value !== null && value !== "") {
      if (type === "boolean") {
        return value === true || parseInt(value) === 1;
      } else if (type === "date") {
        return moment(value).utc().format("YYYY-MM-DD");
      }
      return value;
    }
  }
  if (type === "boolean") return false;
  return "";
};

export const getTotalCompras = (customer) => {
  let total = 0;
  if (Array.isArray(customer.invoices)) {
    customer.invoices.forEach((purchase) => {
      total += parseFloat(purchase.total_payment);
    });
  }
  if (Array.isArray(customer.purchases)) {
    customer.purchases.forEach((purchase) => {
      if (purchase.subscription_id === null) {
        total += parseFloat(purchase.total_payment);
      }
    });
  }
  return total;
};

export const isUserComplete = (user) => {
  let complete = true;
  Object.keys(user).forEach((key) => {
    if (
      user[key] === null &&
      !["deletedAt", "file", "file_id", "signup_reason", "stripe_id"].includes(
        key
      )
    ) {
      complete = false;
    }
  });
  return complete;
};

export const getGalleryPictures = (pictures) => {
  return pictures.map((picture) => ({
    original: `${S3_ENDPOINT}/${picture.name}.${picture.type}`,
    thumbnail: `${S3_ENDPOINT}/${picture.name}.${picture.type}`,
  }));
};

export const htmlToBlocks = (html) => {
  const htmlBlocks = HTMLReactParser(html);
  if (!Array.isArray(htmlBlocks)) {
    return [{ type: "paragraph", data: { text: htmlBlocks } }];
  }
  const blocks = [];
  htmlBlocks.forEach((block) => {
    if (block.type === "p") {
      blocks.push({ type: "paragraph", data: { text: block.props.children } });
    } else if (block.type[0] === "h") {
      const level = block.type[1];
      blocks.push({
        type: "header",
        data: {
          text: block.props.children,
          level,
        },
      });
    } else if (block.type === "ol") {
      blocks.push({
        type: "list",
        data: {
          style: "ordered",
          items: block.props.children.map(({ props }) => {
            if (Array.isArray(props.children)) {
              return props.children[0];
            }
            return props.children;
          }),
        },
      });
    } else if (block.type === "ul") {
      blocks.push({
        type: "list",
        data: {
          style: "unordered",
          items: block.props.children.map(({ props }) => {
            if (Array.isArray(props.children)) {
              return props.children[0];
            }
            return props.children;
          }),
        },
      });
    }
  });
  return blocks;
};

export const getAddress = (location) => {
  if (location === null) return "";
  if (location.show_exact_location) {
    return `${location.street} ${location.number} ${location.neighborhood}, ${location.city}`;
  }
  if (location.neighborhood !== "" && location.city !== "") {
    return `${location.neighborhood}, ${location.city}`;
  }
  return "";
};

export const parseOperand = (operand) => {
  switch (operand) {
    case "!==":
      return "no";
    case "==":
      return "igual a";
    case ">=":
      return "mayor o igual que";
    case "<=":
      return "menor o igual que";
    default:
      return "";
  }
};

export const parseField = (field) => {
  switch (field) {
    case "income":
      return "ingreso";
    case "self":
      return "Yo mismo";
    case "company":
      return "Tengo una empresa";
    case "job":
      return "Tengo un empleo";
    case "other":
      return "Alguien más";
    case "salesperson":
      return "Comerciante";
    case "entrepreneur":
      return "Profesionista Independiente";
    case "student":
      return "Estudiante";
    case "decision":
      return "Decisión Personal";
    default:
      return field;
  }
};

export const token_options = [
  {
    value: 500,
    label: "Tweet",
  },
  {
    value: 1000,
    label: "Caption",
  },
  {
    value: 1900,
    label: "Video Script",
  },
];

export const parseTemperature = (temperature) => {
  temperature = String(temperature);
  switch (temperature) {
    case "0.5":
      return "Very similar to Original";
    case "0.7":
      return "Moderately Creative";
    default:
      return "Creative";
  }
};

export const parseMaxTokens = (max_tokens) => {
  max_tokens = parseInt(max_tokens);
  const token = token_options.find((option) => option.value === max_tokens);
  if (token) return token.label;
  return `Max Tokens: ${max_tokens}`;
};

export const copyToClipboard = (value, callback) => {
  let input = document.createElement("textarea");
  input.value = value;
  input.id = "copy-input";
  document.body.appendChild(input);
  var copyText = document.getElementById("copy-input");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  navigator.clipboard.writeText(copyText.value).then(() => {
    if (typeof callback === "function") {
      callback();
    }
  });
  input.remove();
};

export const setupTooltips = () => {
  window.$('[data-bs-toggle="tooltip"]').tooltip({
    trigger: "hover",
  });
  window.$('[rel="tooltip"]').on("click", function () {
    window.$(this).tooltip("hide");
  });
};

const findHeaderRow = (rows) => {
  let headerIndex = null;
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    Object.keys(row).forEach((key) => {
      if (String(row[key]).toLowerCase() === "prompt") {
        headerIndex = i;
      }
    });
    if (headerIndex !== null) {
      break;
    }
  }
  return headerIndex;
};

export const getSheetHeaders = (workbook, sheetName) => {};
