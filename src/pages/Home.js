import React, { Component } from 'react'
import Header from '../theme/Header'
import { Feeds, AddFeed, Feed, AppHeader } from '../components/containers'

class Home extends Component{

    render(){
        return(
            <div id="wrapper">
		        <div id="main">
		            <div className="inner">
                        <AppHeader />
                        <section id="banner">
                            <Feed />
                        </section>
              		</div>
              	</div>

                <div id="sidebar">
                    <div className="inner">
                        <section id="search" className="alt">
                            <AddFeed />
                        </section>
                        <nav id="menu">
            	            <header className="major">
            	                <h2>News Feeds</h2>
            	            </header>
                            <Feeds />
                        </nav>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home
