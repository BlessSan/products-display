import { Dropdown, DropdownButton, Stack } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState } from "react";

const SortMenu = ({ handleSort }) => {
  const router = useRouter();
  const query = router.query;
  const [orderBy, setOrderBy] = useState("");
  const [direction, setDirection] = useState("");
  const [displayLimit, setDisplayLimit] = useState(5);

  const handleQueryParam = () => {
    const orderBy =
      query.orderBy === undefined ? "" : query.orderBy.toLowerCase();
    const direction = query.direction === undefined ? "" : query.direction;
    direction = direction === "Ascending" ? "asc" : "desc";
    const displayLimit =
      query.displayLimit === undefined ? 5 : query.displayLimit;

    return [orderBy, direction, displayLimit];
  };

  const categoryList = ["Name", "Description", "Price", "Quantity"];
  const handleOrderBy = (e) => {
    setOrderBy(e);
    const [orderBy, direction, displayLimit] = handleQueryParam();
    router.push(
      `?orderBy=${e.toLowerCase()}&direction=${direction}&paginate=${displayLimit}`
    );
    handleSort();
  };

  const handleDirection = (e) => {
    setDirection(e);
    e = e === "Ascending" ? "asc" : "desc";
    const [orderBy, direction, displayLimit] = handleQueryParam();
    router.push(`?orderBy=${orderBy}&direction=${e}&paginate=${displayLimit}`);
    handleSort();
  };

  const handleDisplayLimit = (e) => {
    setDisplayLimit(e);
    const [orderBy, direction, displayLimit] = handleQueryParam();
    router.push(`?orderBy=${orderBy}&direction=${direction}&paginate=${e}`);
    handleSort();
  };

  return (
    <Stack gap={2} direction="horizontal">
      <div className="vr" />
      <div className="vr" />
      <DropdownButton
        variant="outline-secondary"
        title={orderBy || "Sort By"}
        onSelect={(e) => handleOrderBy(e)}
      >
        {categoryList.map((categoryItem, index) => (
          <Dropdown.Item
            active={categoryItem === orderBy}
            key={index}
            eventKey={categoryItem}
          >
            {categoryItem}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <DropdownButton
        variant="outline-secondary"
        title={direction || "Direction"}
        onSelect={(e) => handleDirection(e)}
      >
        <Dropdown.Item active={direction === "Ascending"} eventKey="Ascending">
          Ascending
        </Dropdown.Item>
        <Dropdown.Item
          active={direction === "Descending"}
          eventKey="Descending"
        >
          Descending
        </Dropdown.Item>
      </DropdownButton>
      <DisplayPerPage
        displayLimit={displayLimit}
        setDisplayLimit={setDisplayLimit}
        handleDisplayLimit={handleDisplayLimit}
      />
    </Stack>
  );
};

const DisplayPerPage = ({ displayLimit, handleDisplayLimit }) => {
  const displayOptions = [5, 10, 15, 20, 25];

  return (
    <DropdownButton
      variant="outline-secondary"
      title={displayLimit}
      onSelect={(e) => handleDisplayLimit(e)}
    >
      {displayOptions.map((displayItem, index) => (
        <Dropdown.Item
          key={index}
          active={displayLimit === displayItem}
          eventKey={displayItem}
        >
          {displayItem}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default SortMenu;
