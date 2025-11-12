export default function SingleImage({ singleProduct }) {
  return (
    <div className="relative overflow-hidden rounded-md">
      <img src={singleProduct.image} />
    </div>
  );
}
