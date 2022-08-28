interface ItemProps {
  currentItems: string[];
}

export default function Item(props: ItemProps) {
  const { currentItems } = props;
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item}>
            {/* Image */}
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}
