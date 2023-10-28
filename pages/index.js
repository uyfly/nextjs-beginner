import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";

import path from "path";
import fs from "fs/promises";

import Link from "next/link";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();

  const { products } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  console.log("(Re-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
