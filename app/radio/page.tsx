import { AudiosProvider } from "@/components/radio/audioState/store";
import MyRadio from "@/components/radio/radioMain";
import { getAllSongs } from "@/sanity/lib/queries";

const Page = async () => {
  const songs = await getAllSongs();

  return (
    <div>
      <AudiosProvider>
        <MyRadio songs={songs} />
      </AudiosProvider>
    </div>
  );
};

export default Page;
