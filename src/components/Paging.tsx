import { Box, HStack, Icon, Input } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

interface Props {
  limit: number;
  offset: number;
  totalItem: number;
  onChangePage: (page: number) => void;
}

const Paging = ({ onChangePage, limit, offset, totalItem }: Props) => {
  const [shownItem, setShownItem] = useState(0);
  useEffect(() => {
    if (offset + limit > totalItem) {
      setShownItem(totalItem);
    } else {
      setShownItem(offset + limit);
    }
  }, [limit, offset, totalItem]);

  const totalPage = Math.ceil(totalItem / limit);
  const selectedPage = offset / limit + 1;

  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);

  const [, setInputValue] = useState("");
  const handleLimit = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= Math.ceil(pages.length / 10)) {
      setInputValue(e.target.value);
    }
  };

  const selectedRef = useRef<HTMLInputElement>(null);
  const changeSelectedPage = () => {
    if (selectedRef.current) {
      if (parseInt(selectedRef.current.value, 10) > pages.length) return;
      onChangePage(parseInt(selectedRef.current.value, 10));
    }
  };

  console.log(limit);
  console.log(totalItem);

  if (totalItem === 0 || limit > totalItem) return <></>;
  return (
    <>
      <HStack
        justifyContent={"space-between"}
        fontSize={"0.85rem"}
        marginTop={3}
      >
        <HStack>
          <Box
            className={selectedPage > 1 ? "cursor-pointer" : ""}
            paddingX={1}
            onClick={
              selectedPage > 1
                ? () => onChangePage(selectedPage - 1)
                : undefined
            }
            color={selectedPage > 1 ? "blackAlpha" : "gray.400"}
          >
            <Icon as={MdOutlineArrowBackIosNew} />
          </Box>
          {pages.length < 5 ? (
            pages.map((page) => (
              <Box
                key={page}
                paddingX={1}
                className={
                  page === selectedPage
                    ? "selected-page"
                    : "cursor-pointer unselected-page"
                }
                onClick={() => onChangePage(page)}
              >
                {page}
              </Box>
            ))
          ) : (
            <>
              {pages.slice(0, 2).map((page) => (
                <Box
                  key={page}
                  paddingX={1}
                  className={
                    page === selectedPage
                      ? "selected-page"
                      : "cursor-pointer unselected-page"
                  }
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </Box>
              ))}
              <Box>...</Box>
              {pages.slice(pages.length - 2, pages.length).map((page) => (
                <Box
                  key={page}
                  paddingX={1}
                  className={
                    page === selectedPage
                      ? "selected-page"
                      : "cursor-pointer unselected-page"
                  }
                  onClick={() => onChangePage(page)}
                >
                  {page}
                </Box>
              ))}
            </>
          )}
          <Box
            className={selectedPage < totalPage ? "cursor-pointer" : ""}
            paddingX={1}
            onClick={
              selectedPage < totalPage
                ? () => onChangePage(selectedPage + 1)
                : undefined
            }
            color={selectedPage < totalPage ? "blackAlpha" : "gray.400"}
          >
            <Icon as={MdOutlineArrowForwardIos} />
          </Box>
          <Box color={"gray.600"}>
            Showing {offset + 1} to {shownItem} of {totalItem} items
          </Box>
        </HStack>
        <HStack>
          <Box>Loncat ke halaman</Box>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              changeSelectedPage();
            }}
          >
            <Box>
              <Input
                onChange={(e) => handleLimit(e)}
                textAlign={"center"}
                maxLength={Math.ceil(pages.length / 10)}
                padding={1}
                width={"40px"}
                ref={selectedRef}
              />
            </Box>
          </form>
        </HStack>
      </HStack>
    </>
  );
};

export default Paging;
