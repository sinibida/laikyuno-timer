export default function Dot({
  variant = "medium",
}: {
  variant?: "medium" | "small";
}) {
  const size = variant === "small" ? 2 : 4;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        backgroundColor: "currentcolor",
      }}
    />
  );
}
