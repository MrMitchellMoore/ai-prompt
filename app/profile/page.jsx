"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

//TODO Next.js 13 Full Course 2023 | Build and Deploy a Full Stack App Using the Official React Framework
// 2:14:55
// 2:46:54
// 3:10

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  });

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post.id.toString()}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const filteredPosts = posts.filter((p) => p.id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        alert('Can"t delete a post that doesn"t exist 🤷🏽‍♂️');
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
