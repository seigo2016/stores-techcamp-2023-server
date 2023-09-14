import Image from "next/image";

export default function ProductCard(props: {
  name: string;
  price: number;
  url: string;
  onClick: any;
}) {
  return (
    <div
      className="w-[220px] h-[300px] text-[14px] font-medium cursor-pointer border-[1px] border-[#afafaf] rounded-[12px] overflow-hidden shadow-[0_0_4px_2px_rgba(0,0,0,0.25)]"
      onClick={props.onClick}
    >
      <Image src={props.url} alt={props.name} width={220} height={220} />
      <div className="p-[12px] flex flex-col space-between">
        <div>{props.name}</div>
        <div className="text-right">{props.price}円</div>
      </div>
    </div>
  );
}
