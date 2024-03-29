import Tag from "@osn/common-ui/es/Tag";
import { text_dark_accessory } from "./styles/colors";

const statusColors = {
  active: "purple",
  pending: "turquoise",
};

export default function StatusTag({ children }) {
  if (!children) return null;
  return (
    <Tag
      color={statusColors[children] || text_dark_accessory}
      style={{ textTransform: "capitalize" }}
    >
      {children}
    </Tag>
  );
}
