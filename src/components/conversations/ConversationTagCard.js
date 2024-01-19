import { Link } from "@reach/router";
import React from "react";

const ConversationTagCard = ({ tag, setTagFilter }) => {

    return (
        <div className={`col-12 col-md-6 col-lg-4 col-xl-3`}>
            <Link
                to={`/conversation/tags/${tag}`}
                className="card px-4 py-5 text-center mb-3 bg-light"
            >
                <h4 className="text-capitalize">{tag}</h4>
            </Link>
        </div>
    );
};

export default ConversationTagCard;
