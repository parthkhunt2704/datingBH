import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Container, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { getFileImage } from '../Api/Api';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import { useTranslation } from 'react-i18next';


const drawerWidth = 240;

const Navbar = (props) => {
  const { t } = useTranslation();
  const navItems = [{
    name:`${t("navbar.about")}`,
    value:"About"
  }, {
    name:`${t("navbar.contact")}`,
    value:"Contact"
  },{
    name:`${t("navbar.faq")}`,
    value:"FAQ"
  }];
  const userData = JSON.parse(localStorage.getItem("userinfo"))
  const userImage = JSON.parse(localStorage.getItem("picture"))
  console.log("userImage",userImage);
  const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = (anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const navigateItem = (e) => {
      if (e === "Login") {
        navigate("/login")  
      }
      if (e === "About") {
        navigate("/about")  
      }
      if (e === "Contact") {
        navigate("/contact")  
      }
      if (e === "FAQ") {
        navigate("/FAQ")  
      }
      if (e === "search") {
        navigate("/search")  
      }
      if (e === "profile-info") {
        navigate("/profile-info")  
      }
      if (e === "boy-profile") {
        navigate("/boy-profile")  
      }
      if (e === "plan") {
        navigate("/my-plan")  
      }
      if (e === "request") {
        navigate("/my-profile-request")  
      }
      if (e === "buy-plan") {
        navigate("/buy-plans")  
      }
    }

    const logout = () => {
      localStorage.removeItem("interest")
      localStorage.removeItem("access_tocken")
      localStorage.removeItem("language")
      localStorage.removeItem("userinfo")
      localStorage.removeItem("picture")
      navigate("/")
    }
    const drawer = (
        <div className="">
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
         <Link to="/">
         <Typography variant="h6" sx={{ my: 2 }}>
          <img className='mt-0' width={150} src={process.env.PUBLIC_URL +'/assest/Images/logo-2.svg'} />
          </Typography>
          </Link>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item?.value} disablePadding onClick={() => navigateItem(item?.value)}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item?.name} />
                </ListItemButton>
              </ListItem>
            ))}
            
              {userData?.gender === "M" && <>
              <ListItem disablePadding onClick={() => navigateItem("search")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={`${t("navbar.Search")}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => navigateItem("plan")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={`${t("navbar.My_Plan")}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => navigateItem("buy-plan")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={`${t("navbar.Buy_Plan")}`} />
                </ListItemButton>
              </ListItem>
              </>}
              {userData?.gender === "F" && <>
              <ListItem disablePadding onClick={() => navigateItem("request")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={`${t("navbar.Request")}`} />
                </ListItemButton>
              </ListItem>
              </>}
              {userData ? <>
                <ListItem disablePadding onClick={() => navigateItem("Login")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={`${t("navbar.Profile")}`} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding onClick={() => logout()}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText className="Custom_Btn" primary={`${t("navbar.logout")}`} />
                </ListItemButton>
              </ListItem>
             </> : <ListItem disablePadding onClick={() => navigateItem("Login")}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText className="Custom_Btn" primary={`${t("navbar.login")}`}/>
                </ListItemButton>
              </ListItem>}
          </List>
        </Box>
              <LanguageSelect />
        </div>
      );
    
      const container = window !== undefined ? () => window().document.body : undefined;    

  return (
   <div className='navbar_main'>
   <Box sx={{ display: 'flex',marginBottom:"55px"  }}>
      <AppBar component="nav">
   <Container>
        <Toolbar>
        <Link to="/">
        <Typography variant="h6" sx={{ mr: 2, display: { sm: 'none' } }}>
          <img className='mt-0' width={150} src={process.env.PUBLIC_URL + '/assest/Images/logo-2.svg'} />
          </Typography>
          </Link>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
          >
          <Link to="/">
            <img className='mt-0' width={250} src={process.env.PUBLIC_URL + '/assest/Images/logo-2.svg'} />
          </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
              <Button className={`nav_btn ${item === "Login" && "Custom_Btn py-2"}`} key={item?.value} sx={{ color: 'black' }} onClick={() => navigateItem(item?.value)}>
                {item?.name}
              </Button>
            ))}
            <LanguageSelect />

            {userData ? <>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {userImage.length !== 0 ? userImage.map((e) => {
              return (
                <>
                {e?.defult === "Y" &&
                <Avatar sx={{ width: 40, height: 40 }} src={getFileImage(
                  "storage/app/public/images/profile_images/" +
                  e?.picture_name
              )}>
              </Avatar>
                }
                </>
              )
            }) : <Avatar sx={{ width: 40, height: 40 }} src={"/assest/Images/user-profile.png"}>
            </Avatar>}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigateItem(userData?.gender === "F" ? "profile-info" : "boy-profile")}>
          <Avatar /> {t("navbar.Profile")}
        </MenuItem>
        <MenuItem>
          <Avatar />  {t("navbar.My_account")}
        </MenuItem>
        {userData?.gender === "M" && <>
        <MenuItem onClick={() => navigateItem("search")}>
          <Avatar /> {t("navbar.Search")}
        </MenuItem>
        <MenuItem onClick={() => navigateItem("plan")}>
          <Avatar /> {t("navbar.My_Plan")}
        </MenuItem>
        <MenuItem onClick={() => navigateItem("buy-plan")}>
          <Avatar />  {t("navbar.Buy_Plan")}
        </MenuItem>
        </>}
        {userData?.gender === "F" && <>
        <MenuItem onClick={() => navigateItem("request")}>
          <Avatar /> {t("navbar.Request")}
        </MenuItem>
        </>}
        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("navbar.logout")}
        </MenuItem>
      </Menu>
      </> : <Button className={`nav_btn Custom_Btn py-2`} sx={{ color: 'black' }} onClick={() => navigateItem("Login")}>
      {t("navbar.login")}
              </Button>}
          </Box>
        </Toolbar>
   </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
      </Box>
    </Box>
   </div>
  )
}

export default Navbar