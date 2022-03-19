import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DropdownButton, Form, Dropdown, Button } from "react-bootstrap";

const SearchBar = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [formValue, setFormValue] = useState("");
  const categoryList = ["Name", "Description", "Price", "Quantity"];

  const handleSearch = () => {
    router.push(`?value=${formValue}&category=${category}`);
  };

  return (
    <>
      <Form.Control
        placeholder="search"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
      />
      <DropdownButton
        variant="outline-secondary"
        title={category || "Category"}
        onSelect={(e) => setCategory(e)}
      >
        {categoryList.map((categoryItem, index) => (
          <Dropdown.Item
            active={categoryItem === category}
            key={index}
            eventKey={categoryItem}
          >
            {categoryItem}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button onClick={handleSearch} variant="outline-primary">
        Search
      </Button>
    </>
  );
};

export default SearchBar;
