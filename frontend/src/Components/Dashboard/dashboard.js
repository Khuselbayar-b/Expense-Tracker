import React from 'react';
import { styled } from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';

function Dashboard() {
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className='stats'>
                    <div className='chart'>
                        
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}
 //dash
const DashboardStyled = styled.div`

`;

export default Dashboard