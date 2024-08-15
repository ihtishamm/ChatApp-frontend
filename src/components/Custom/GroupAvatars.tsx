const GroupAvatar = ({ avatars }: { avatars: string[] }) => {
    const sliceData = avatars?.slice(0, 3);
  
    const position: { [key: number]: string } = {
      0: "top-0 left-[12px]",
      1: "bottom-0 left-0",
      2: "bottom-0 right-0"
    };
  
    return (
      <div className="relative h-20 w-20">
        {sliceData.map((avatar, index) => (
          <div
            key={index}
            className={`absolute inline-block rounded-full overflow-hidden w-[40px] h-[40px] ${position[index]}`}
          >
            <img
              src={avatar || avatar}
              alt={`Member ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  };
  
  export default GroupAvatar;
  