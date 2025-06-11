import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllSiteVisitsByUserId } from '../redux/actions/stateVisit';
import { getAllUsers } from '../redux/actions/user';

const Home = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user.id) {
            const fetchData = async () => {
                await dispatch(getAllSiteVisitsByUserId(user.id));
                await dispatch(getAllUsers());
                if (user.role === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/front');
                }
            };

            fetchData();
        }
    }, [user, dispatch, navigate]);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
};

export default Home;
