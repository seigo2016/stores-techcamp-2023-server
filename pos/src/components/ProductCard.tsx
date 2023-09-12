import Image from "next/image";

export default function ProductCard(props: {
  name: string;
  price: number;
  url: string;
  onClick: any;
}) {
  return (
    <div
      className="w-[200px] h-[240px] text-sm inline-block"
      onClick={props.onClick}
    >
      <Image src={props.url} alt={props.name} width={200} height={200} />
      <div>
        <div>{props.name}</div>
        <div>{props.price}円</div>
      </div>
    </div>
  );
}
