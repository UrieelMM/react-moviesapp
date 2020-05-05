import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import ReactPlayer from "react-player";
import "./ModalVideo.scss";

const ModalVideo = (props) => {
  const { videoKey, videoPlatform, isOpen, close, stopPlaying } = props;
  const [urlVideo, setUrlVideo] = useState(null);
  useEffect(() => {
    switch (videoPlatform) {
      case "YouTube":
        setUrlVideo(`https://youtu.be/${videoKey}`);
        break;
      case "Vimeo":
        setUrlVideo(`https://vimeo.com/${videoKey}`);
        break;
      default:
        break;
    }
  }, [videoKey, videoPlatform]);

  return (
    <Modal
      className="modal-video"
      visible={isOpen}
      onCancel={close}
      centered
      footer={false}
    >
      <ReactPlayer url={urlVideo} controls playing={stopPlaying} />
    </Modal>
  );
};

export default ModalVideo;
