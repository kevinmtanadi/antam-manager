interface Props {
  selectedPage: string;
}

const Content = ({ selectedPage }: Props) => {
  switch (selectedPage) {
    case "dashboard":
      return <div>Woi</div>;
    default:
      return <div>Woi</div>;
  }

  return <div>Woi</div>;
};

export default Content;
