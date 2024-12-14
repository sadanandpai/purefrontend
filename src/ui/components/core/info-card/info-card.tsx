import Image from "next/image";
import classes from "./info-card.module.scss";

interface Props {
  title: string;
  description: string;
  image: string;
  alt: string;
  tilt: number;
}

export function InfoCard({ title, description, image, alt, tilt }: Props) {
  return (
    <div
      style={{
        borderRadius: "24px",
        padding: "24px",
        width: "296px",
        color: "white",
        background: `linear-gradient(180deg, rgba(213, 213, 213, 0.2) 0%, rgba(3, 174, 102, 0.05) 100%)`,
        border:
          "1px solid linear-gradient(180deg, #D5D5D5 0%, rgba(3, 174, 102, 0.25) 100%)",
        transform: tilt ? `rotate(${tilt}deg)` : "none",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
        }}
      >
        <Image
          src={image}
          alt={alt}
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
          className="inline"
        />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
}
