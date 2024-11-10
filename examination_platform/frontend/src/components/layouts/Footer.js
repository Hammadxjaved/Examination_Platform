import React from 'react'
import { Container } from 'react-bootstrap';


export default function Footer() {
    return (
        <div> <footer style={{
            backgroundColor: '#282c34', color: 'white', padding: '20px', textAlign: 'center',
            marginTop: '0px'
        }}>
            <Container>
                <p>&copy; 2024 Computer Science Department</p>
            </Container>
        </footer>
        </div>
    )
}
