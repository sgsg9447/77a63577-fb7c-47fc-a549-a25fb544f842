import { useState, useEffect } from "react";
import BookmarkIcon from "../assets/BookmarkIcon";
import { Toast } from "./Toast";

export const Bookmark = ({ coinId }: { coinId: string }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    setIsBookmarked(bookmarks.includes(coinId));
  }, [coinId]);

  const handleBookmarkClick = () => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    const bookmarks = new Set(
      storedBookmarks ? JSON.parse(storedBookmarks) : []
    );
    if (bookmarks.has(coinId)) {
      bookmarks.delete(coinId);
      setToastMessage("북마크가 해제되었습니다.");
    } else {
      bookmarks.add(coinId);
      setToastMessage("북마크가 추가되었습니다.");
    }
    localStorage.setItem("bookmarks", JSON.stringify([...bookmarks]));
    setIsBookmarked(bookmarks.has(coinId));
    setToastVisible(true);
  };

  return (
    <>
      <div onClick={handleBookmarkClick}>
        {isBookmarked ? <BookmarkIcon color="#f5c66a" /> : <BookmarkIcon />}
      </div>
      <Toast
        message={toastMessage}
        visible={toastVisible}
        setVisible={setToastVisible}
      />
    </>
  );
};
