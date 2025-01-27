import ButtonHeader from "./ButtonHeader/ButtonHeader";

const Header = () => {
  return (
    <header className="w-full">
      <div className="max-w-[1200px] flex w-full justify-between px-4 h-[75px] items-center m-auto">
        <div>
            ICON
        </div>
        <div className="flex gap-4">

        <ButtonHeader
          to="/qibble/private"
          fontColor="linear-gradient(90deg, #57E6B8, #37D0FC)"
          > Rejoins tes amies !
          </ButtonHeader>


          <ButtonHeader
          to="/qibble/createLobby"
          fontColor="linear-gradient(90deg, #57E6B8, #37D0FC)"
          > Commencer Maintenant
          </ButtonHeader>

          <ButtonHeader 
          to="/qibble/public"
          fontColor="linear-gradient(90deg, #FA5A7C, #B274EF)"
          
          > Découvrer !
          </ButtonHeader>

        </div>
      </div>
    </header>
  );
};

export default Header;
