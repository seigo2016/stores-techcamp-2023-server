import Link from "next/link";

export default function Footer() {
  const buttons = [
    {
      iconName: "recommend",
      text: "おすすめ",
      link: "/recommend",
    },
    {
      iconName: "qr_code_2",
      text: "OR",
      link: "/qrcode",
    },
    {
      iconName: "list_alt",
      text: "履歴",
      link: "/history",
    },
  ];
  return (
    <footer className="w-screen flex justify-center gap-[32px] py-[8px] border-t-[1px] border-t-[#000000]">
      {buttons.map((button) => {
        return (
          <Link
            key={button.iconName}
            href={button.link}
            className="flex flex-col text-[#8A8A8A]"
          >
            <span
              className="w-[40px] h-[40px] material-symbols-outlined"
              style={{
                fontVariationSettings: "'opsz' 40",
                fontSize: "40px",
              }}
            >
              {button.iconName}
            </span>
            <div className="text-[10px] font-regular text-center">
              {button.text}
            </div>
          </Link>
        );
      })}
    </footer>
  );
}
