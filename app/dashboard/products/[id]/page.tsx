import ProductDetail from "./product-detail";

const page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return <ProductDetail id={params.id} />;
};

export default page;
