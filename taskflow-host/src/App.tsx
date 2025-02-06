import React, { useEffect } from "react";
import RoutesConfig from "./routes/RoutesConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { clearMessage } from "./store/slices/messageSlice";
import { message } from "antd";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { content, type } = useSelector((state: RootState) => state.message);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (content && type) {
      console.log(`Message Type: ${type}, Content: ${content}`);
      messageApi[type](content);
      dispatch(clearMessage());
    }
  }, [content, type, dispatch]);

  return (
    <div>
      {contextHolder}
      <RoutesConfig />
    </div>
  );
};

export default App;
