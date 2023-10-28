
import axios from 'axios';
import Urls from './Urls';



export const getUsers = () => axios.get(Urls.Users_url)
