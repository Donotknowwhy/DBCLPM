import Main from "../components";
import { Typography } from "antd";
import { useUser } from "../utils/use-user";

const { Title } = Typography;

export default function Home() {

  const {user} = useUser();

  return (
    <div>
      <Main />
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        <Title level={3}>
          Chào mừng {user ? user.displayName : 'null'} đã đến với trang quản trị ứng dụng bảo hiểm xã hội
        </Title>
      </div>
    </div>
  );
}
