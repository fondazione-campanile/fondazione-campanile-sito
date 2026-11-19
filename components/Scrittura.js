export default function Scrittura({ as: Tag = 'h2', children, ...resto }) {
  return (
    <Tag data-scrittura {...resto}>
      <span className="visually-hidden">{children}</span>
      <span aria-hidden="true">
        {Array.from(children).map((carattere, indice) => (
          <span className="lettera" style={{ '--i': indice }} key={indice}>
            {carattere}
          </span>
        ))}
      </span>
    </Tag>
  );
}