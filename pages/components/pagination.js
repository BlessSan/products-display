import { Pagination } from "react-bootstrap";

const MyPagination = ({ data, handlePaginateFetch }) => {
  const { current_page, first_page_url, links, last_page_url, last_page } =
    data;
  return (
    <Pagination>
      {current_page !== 1 ? (
        <Pagination.First onClick={() => handlePaginateFetch(first_page_url)} />
      ) : null}
      {links.map((link, index) => {
        return (
          link.url && (
            <Pagination.Item
              key={index}
              active={link.active}
              onClick={() => handlePaginateFetch(link.url)}
            >
              {link.label}
            </Pagination.Item>
          )
        );
      })}
      {current_page !== last_page ? (
        <Pagination.Last onClick={() => handlePaginateFetch(last_page_url)} />
      ) : null}
    </Pagination>
  );
};

export default MyPagination;
