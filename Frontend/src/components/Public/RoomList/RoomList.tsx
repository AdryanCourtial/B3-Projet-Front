const RoomList = ({ rooms }) => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Rooms</h1>
        <div className="flex flex-wrap -m-4">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    );
  };
  
  export default RoomList;
  