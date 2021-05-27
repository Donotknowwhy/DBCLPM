import Main from "../components";
import { Typography } from "antd";
import { useUser } from "../utils/use-user";
import Head from 'next/head'
const { Title } = Typography;

export default function Home() {

  const {user} = useUser();

  return (
    <div>
    <Head>
        <title>Trang chủ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main />
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        <Title level={3}>
          Chào mừng {user ? user.email : 'null'} đã đến với trang quản trị ứng dụng bảo hiểm xã hội
        </Title>
      </div>
    </div>
  );
}
