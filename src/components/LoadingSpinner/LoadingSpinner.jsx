import { Blocks } from "react-loader-spinner";
import s from "/Users/dmytro.kovbasiuk/Desktop/HTML/EDU JS/goit-react-hw-05/src/components/LoadingSpinner/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={s.block}>
      <div className="blocks-wrapper">
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
