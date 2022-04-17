import { MailOutline, Phone, Room } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import logo from "../logo03.png";
import { Image } from "react-bootstrap";
import Paystack from "../Pics/Paystack.png";
import { mobile } from "./responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20;
`;
// const Logo = styled.img`
//   margin: 20px 0;
// `;
const Desc = styled.p``;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
    margin:0
    padding:0;
    list-style: none;
    display: flex;
     /* flex-wrap : wrap; */

`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#ff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Image src={logo} alt="image" width="38%" height="20%" />
        <Desc>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ornare
          vel velit in porta. Donec convallis mollis consequat. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Morbi fermentum, ex eget
          euismod vehicula,
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <i className="bi bi-facebook"></i>
          </SocialIcon>
          <SocialIcon color="E4405F">
            <i className="bi bi-instagram"></i>
          </SocialIcon>
          <SocialIcon color="E60023">
            <i className="bi bi-youtube"></i>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title> Useful Links </Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Herbs for Men and Women</ListItem>

          <ListItem>Herbs strictly for Men</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          82 koloba road, Alaja megida bus-stop Ayobo Ipaja Lagos
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +234 802 323 5081
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          Atumoala-globalHerbs@gmail.com
        </ContactItem>
        <Payment src={Paystack} alt="paystack" style={{ width: "40px" }} />
      </Right>
    </Container>
  );
};

export default Footer;
