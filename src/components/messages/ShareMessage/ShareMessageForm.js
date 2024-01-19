import React, { useContext, useState, useEffect } from "react";
import { MessagesContext } from "../../../context/MessagesContext";
import ShareToPlatformCard from "./ShareToPlatformCard";
import { AuthContext } from "../../../context/AuthContext";

const ShareMessageForm = ({ message, handleCancel }) => {
    const { shareMessageContent } = useContext(MessagesContext);
    const { linkedPlatforms } = useContext(AuthContext);

    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const handleShare = () => {
        if (selectedPlatform) {
            shareMessageContent({ ...message, platform: selectedPlatform.name });
        }
    };

    const renderLinkedPlatforms = () => {
        if (!linkedPlatforms || selectedPlatform) return null;
        return linkedPlatforms.map((platform) => (
            <ShareToPlatformCard
                key={platform.name}
                platform={platform}
                setPlatform={setSelectedPlatform}
            />
        ));
    };

    return (
        <div>
            {selectedPlatform ? (
                <div className="mb-3">
                    <p>
                        Are you sure you want to share this content to{" "}
                        <b>{selectedPlatform.title}</b>?
                    </p>
                    <div className="my-4 card bg-light p-3">{message?.content}</div>
                </div>
            ) : (
                <div className="mb-3">
                    <p>Share to which platforms?</p>
                    {renderLinkedPlatforms()}
                </div>
            )}
            <div className="row">
                {selectedPlatform ? (
                    <div className="col-6">
                        <button onClick={() => setSelectedPlatform(null)} className="btn w-100 text-muted">
                            Go Back
                        </button>
                    </div>
                ) : (
                    <div className="col-6">
                        <button onClick={handleCancel} className="btn w-100 text-muted">
                            Cancel
                        </button>
                    </div>
                )}
                <div className="col-6">
                    {selectedPlatform ? (
                        <button onClick={handleShare} className="btn w-100 btn-primary">
                            <i className="fa fa-share me-2"></i> Share
                        </button>
                    ) : (
                        <a href="https://zapier.com/find-apps/a" target="_blank" rel="noopener noreferrer" className="btn w-100 btn-primary">
                            Other Platforms
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareMessageForm;
