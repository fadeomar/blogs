import Image from "next/image";

interface AvatarProps {
  src: string; // Image source (URL or local path)
  alt?: string; // Alternative text for accessibility
  size?: number; // Size of the avatar (default: 50px)
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
  size = 50,
}) => {
  return (
    <div
      className="relative rounded-full overflow-hidden border-2 border-gray-300"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover w-full h-full"
        style={{ objectPosition: "center" }} // Ensure the image is centered
        priority // Ensures faster loading
      />
    </div>
  );
};

export default Avatar;
