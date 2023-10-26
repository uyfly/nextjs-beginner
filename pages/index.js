import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";

import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const featuredEvents = getFeaturedEvents();

  const { products } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
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

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
