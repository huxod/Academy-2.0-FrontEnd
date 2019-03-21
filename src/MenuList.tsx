
import * as React from 'react';
import { Menu} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import  SystemTool from './SystemTool';

export default class MenuList extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            checkUser: SystemTool.ifLoged()
        }
    }
    public render() {
        
        return (<Menu pointing secondary inverted>
                            <Menu.Item 
                                as={Link}
                                to='/'
                                name='home'  
                            />
                            <Menu.Item
                                as={Link}
                                to='/login'
                                name='Login'
                            />
                            {!SystemTool.ifLoged() ?( 
                            <Menu.Item
                                    as={Link}
                                    to='/signup'
                                    name='Sign Up'
                                />):null}
                        {SystemTool.ifLoged() ?(                       
                        <Menu.Menu position='right'>
                            {SystemTool.ifAdmin() ?( 
                            <Menu.Item
                                    as={Link}
                                    to='/users'
                                    name='users'
                                />):null}
                            <Menu.Item 
                                as={Link}
                                to='/user'
                                name='User'
                            />
                            <Menu.Item
                                as={Link}
                                to='/lesson'
                                name='Lesson'
                            />
                            <Menu.Item  
                                as={Link}
                                to='/logout'
                                name='Logout' 
                            />
                         </Menu.Menu>):null }

                        </Menu>  )   
    }
}

