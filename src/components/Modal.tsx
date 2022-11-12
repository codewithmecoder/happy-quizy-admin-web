import { MouseEventHandler } from 'react';

interface Props {
  // child: JSX.Element;
  child: any;
  width?: string;
  height?: string;
  backDropOpacity?: string;
  backgroundColor?: string;
  visible: boolean;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const Modal = ({
  child,
  height,
  width,
  backDropOpacity,
  backgroundColor,
  visible,
  onClose,
}: Props) => {
  const handleOnClose = (e: any) => {
    if (e.target?.id === 'modal') onClose(e);
  };

  if (!visible) return null;
  return (
    <div
      id="modal"
      onClick={handleOnClose}
      className={`fixed inset-0 bg-black bg-opacity-${
        backDropOpacity ? backDropOpacity : '10'
      } backdrop-blur-sm flex justify-center items-center`}
    >
      <div
        className={`${backgroundColor ? backgroundColor : 'bg-white'} rounded`}
        style={{
          height: height ? height : '50%',
          width: width ? width : '50%',
        }}
      >
        {child}
      </div>
    </div>
  );
};

export default Modal;
