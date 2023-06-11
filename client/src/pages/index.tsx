import { useQuery } from "@tanstack/react-query";
import { AppLayout } from "@/layouts";
import { ping } from "@/api/usersApi";

export default function Home() {
  const testQuery = useQuery({
    queryKey: ["ping"],
    queryFn: ping,
  });

  console.log(testQuery.data);

  return (
    <AppLayout title="Home">
      <main>Home page</main>
    </AppLayout>
  );
}
