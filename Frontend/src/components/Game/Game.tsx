interface GameProps {
  roomId: string;
  usersInRoom: { pseudo: string; role: string }[];
}

const Game: React.FC<GameProps> = ({ roomId }) => {
  return (
    <div>
      <h1>Game in Room: {roomId}</h1>
    </div>
  );
};

export default Game;
