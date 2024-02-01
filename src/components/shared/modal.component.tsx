type ModalProps = {
  close?: () => void;
  children: React.ReactNode
};

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[85%] sm:w-[50%] flex flex-col">
          <div className="bg-white pt-[18px] pb-3 px-6 rounded">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
