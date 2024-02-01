type ModalProps = {
    close?: () => void;
    children: React.ReactNode
  };
  
  const Modal: React.FC<ModalProps> = (props) => {
    return (
      <>
        <div className="fixed inset-0 opacity-25 bg-black"></div>
        <div className="fixed inset-28 flex h-fit justify-center z-10">
          <div className="bg-white w-[80%] lg:w-[50%] px-6">
            <div onClick={props.close}>
              x
            </div>
            <div>
             {props.children}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Modal;
  