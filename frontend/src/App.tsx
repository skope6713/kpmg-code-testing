import React from 'react';
import axios from 'axios';

import Spinner from './load-spinner/load-spinner';

import './App.css';


type props = {};
type state = {
  originBreedArray: Array<any>,
  breedsList: Array<any>,
  subbreedsList: Array<any>,
  curBreed: string,
  curImgUrl: string,
  showInfoMask: boolean,
  infoType: string,
  info: string,
  needSelectSub: boolean
};

class App extends React.Component<props, state> {

  constructor(props: any) {
    super(props);

    this.state = {
      originBreedArray: [],
      breedsList: [],
      subbreedsList: [],
      curBreed: '',
      curImgUrl: '',
      showInfoMask: false,
      infoType: '',
      info: '',
      needSelectSub: false
    };

    this.breedChangeHandler = this.breedChangeHandler.bind(this);
    this.subbreedChangeHandler = this.subbreedChangeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      showInfoMask: true,
      infoType: 'loading',
      info: '<Spinner />'
    });

		axios.get('http://localhost:8080/api/breads')
			.then(rsp => {
				if(rsp.data.success) {
          this.setState({
            showInfoMask: false,
            infoType: '',
            info: ''
          });
          
          const breedsArray: Array<string> = [...rsp.data.result];
          const breedsArrayWithRepeat: Array<string> = breedsArray.map((breedObj: any) => {
            return breedObj.breed;
          });
          const breedsArrayWithoutRepeat = breedsArrayWithRepeat.filter(function(item, index, array){
            return array.indexOf(item) === index;
          });
          this.setState({
            originBreedArray: [...breedsArray],
            breedsList: [...breedsArrayWithoutRepeat],
          });
				}
      })
      .catch(err => {
        this.setState({
          showInfoMask: true,
          infoType: 'error',
          info: err
        });
      });
  }
  
  breedChangeHandler(event: any) {
    const selectedBreed: string = event.target.value.charAt(0).toLowerCase() + event.target.value.slice(1);
    let subbreedArray: Array<string> = [];

    this.state.originBreedArray.forEach((breedObj: any) => {
      if(breedObj.breed === selectedBreed) {
        if(breedObj['subbreed'] !== undefined) {
          this.setState({
            curBreed: selectedBreed,
            curImgUrl: '',
            needSelectSub: true
          });

          subbreedArray.push(breedObj['subbreed']);
        } else {
          this.setState({
            curBreed: selectedBreed,
            showInfoMask: true,
            infoType: 'loading',
            info: 'Loading'
          });

          const url = `http://localhost:8080/api/bread/${breedObj.breed}`;

          axios.get(url)
          .then(rsp => {
            if(rsp.data.success) {
              this.setState({
                curImgUrl: rsp.data.result,
                showInfoMask: false,
                infoType: '',
                info: ''
              });
            }
          })
          .catch(err => {
            this.setState({
              showInfoMask: true,
              infoType: 'error',
              info: err
            });
          });
        }
      }
    });

    this.setState({
      subbreedsList: [...subbreedArray]
    });
  }

  subbreedChangeHandler(event: any) {
    this.setState({
      showInfoMask: true,
      infoType: 'loading',
      info: '',
      needSelectSub: false
    });

    const subbreed = event.target.value.charAt(0).toLowerCase() + event.target.value.slice(1);
    const breed = this.state.curBreed;
    const url = `http://localhost:8080/api/bread/${breed}&${subbreed}`;

    axios.get(url)
    .then(rsp => {
      if(rsp.data.success) {
        this.setState({
          curImgUrl: rsp.data.result,
          showInfoMask: false,
          infoType: 'loading',
          info: ''
        });
      }
    })
    .catch(err => {
      this.setState({
        showInfoMask: true,
        infoType: 'error',
        info: err
      });
    });
  }

  render() {
    const { breedsList, subbreedsList, curBreed, curImgUrl, showInfoMask, infoType, info, needSelectSub } = this.state;
    const imgStyle = {
      border: '#dcdde1 solid black'
    };

    return (
      <div className="app-ctn">
        {
          showInfoMask ? 
          <div className="status-mask" >
            {
              infoType === 'error' ?
              <div>Error: {info}</div> :
              <Spinner />
            }
          </div> : 
          <div></div>
        }
        <header>
          <h1>
            KPMG Code Testing
          </h1>
          <h3>
            ——— A Dog Breeds Gallery
          </h3>
        </header>
        <main>
          <div className="selector-ctn">
            <select onChange={this.breedChangeHandler} value={curBreed}>
              <option value="">Select Breed</option>
              {
                breedsList.map((breed, index) => {
                  return(
                    <option key={index} value={breed}>{breed.charAt(0).toUpperCase() + breed.slice(1)}</option>
                  );
                })
              }
            </select>
            <select onChange={this.subbreedChangeHandler} value={curBreed}>
              <option value="">Select Sub Breed</option>
              {
                subbreedsList.map((subbreed, index) => {
                  return(
                    <option key={index} value={subbreed}>{subbreed.charAt(0).toUpperCase() + subbreed.slice(1)}</option>
                  );
                })
              }
            </select>
          </div>
          <div className="img-ctn">
              <img src={curImgUrl} style={imgStyle}></img>
              {
                needSelectSub ? <h4>Please Select Subbreed</h4> : <span></span>
              }
              
          </div>
        </main>
        <footer>
          <p>Created by Kai Zhang</p>
        </footer>
      </div>
    );
  }

}

export default App;
