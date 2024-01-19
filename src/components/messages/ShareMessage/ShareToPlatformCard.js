import React from 'react';

const ShareToPlatformCard = ({ platform, setPlatform }) => {

    return (
        <div
            className="card position-relative bg-light mb-3 my-3"
            style={{
                height: '100px',
            }}
        >
            <div className="card-body pb-2 position-relative d-flex align-items-center">
                <img
                    src={platform.icon}
                    alt={`${platform.title} icon`}
                    style={{ height: '40px', marginRight: '15px' }}
                />
                <h3 className='m-0 p-0'>{platform.title}</h3>
            </div>

            <button
                onClick={() => setPlatform(platform)}
                className="btn btn-primary btn-view"
            >
                <i className="fa fa-share"></i>
            </button>
        </div>
    );
}

export default ShareToPlatformCard;
