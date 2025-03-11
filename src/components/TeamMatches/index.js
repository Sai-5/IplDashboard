




import {Component} from 'react';
import Loader from 'react-loader-spinner';
import LatestMatch from '../LatestMatch';
import MatchCard from '../MatchCard';
import './index.css';

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/';

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: {}};

  componentDidMount() {
    this.getTeamMatches();
  }

  formatMatchData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  });

  getTeamMatches = async () => {
    const {match} = this.props;
    const {params} = match;
    const {id} = params;

    const response = await fetch(`${teamMatchesApiUrl}${id}`);
    const fetchedData = await response.json();

    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.formatMatchData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(this.formatMatchData),
    };

    this.setState({teamMatchesData: formattedData, isLoading: false});
  };

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state;
    const {recentMatches} = teamMatchesData;

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(match => (
          <MatchCard key={match.id} matchDetails={match} />
        ))}
      </ul>
    );
  };

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state;
    const {teamBannerURL, latestMatch} = teamMatchesData;

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    );
  };

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  );

  getRouteClassName = () => {
    const {match} = this.props;
    const {params} = match;
    const {id} = params;

    const classMap = {
      RCB: 'rcb',
      KKR: 'kkr',
      KXP: 'kxp',
      CSK: 'csk',
      RR: 'rr',
      MI: 'mi',
      SH: 'srh',
      DC: 'dc',
    };

    return classMap[id] || '';
  };

  render() {
    const {isLoading} = this.state;
    const className = `team-matches-container ${this.getRouteClassName()}`;

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    );
  }
}

export default TeamMatches;



