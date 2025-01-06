import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const ProfileGit = ({ username }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGithubRepos(username))
    })
    const profile = useSelector(state => state.profile);
    const repos = profile?.repos

    return (
        <Fragment>
            <div className='profile-github'>
                Github repos
                <h2 className='test-primary my-1'>
                    {repos === null ? <Spinner /> : (
                        repos.map(repo => (
                            <div key={repo._id} className='repo-bg-white p-1 my-1'>
                                <div>
                                    <h4>
                                        <Link to={repo.html_url} target='_blank' rel='noopener noreferre'>
                                            {repo.name}</Link>
                                    </h4>
                                    <p>
                                        {repo.description}
                                    </p>
                                </div>
                                <div>
                                    <ul>
                                        <li className='badge badge-primary'>
                                            Stars {repo.stargazers_count}

                                        </li>
                                        <li className='badge badge-dark'>
                                            Watchers {repo.watchers_count}

                                        </li>
                                        <li className='badge badge-light'>
                                            Forks  {repo.forks_count}

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    )}
                </h2>

            </div>
        </Fragment>
    )
}

export default ProfileGit;
