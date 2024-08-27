import { Modal } from "antd";
import React from "react";
import ReactPlayer from "react-player";
import useMediaQuery from "../../shared/hooks/useMediaQuery";

const TrailerModal = ({ isModalOpen, setIsModalOpen, video }) => {
  const isSmallScreen = useMediaQuery("(max-width: 870px)");
  return (
    <Modal
      title={``}
      open={isModalOpen}
      centered
      closeIcon={false}
      onOk={() => {
        setIsModalOpen(false);
      }}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      styles={{
        content: {
          padding: 2,
          background: "transparent",
        },
        body: {
          background: "transparent",
          borderRadius: "10px",
        },
        footer: {
          display: "none",
          background: "transparent",
        },
        mask: {
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${video}-U`}
        playing={true}
        width={isSmallScreen ? "100%" : "600px"}
        height={isSmallScreen ? "100%" : "520px"}
        controls={true}
      />
    </Modal>
  );
};

export default TrailerModal;
