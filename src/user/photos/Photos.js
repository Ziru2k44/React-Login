import React, { Component } from "react";
import "./Photos.css";
import { getPhotos, getMorePhotos } from "../../util/APIUtils";


class Photos extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      listItems: null,
      nextItems: null,
      previousItems: null,
      loading: null,
    };
    this.nextlist = this.nextlist.bind(this);
    this.previouslist = this.previouslist.bind(this);
  }

  componentDidMount() {
    this.setState({loading:true,});
   getPhotos()

      .then(response => {
        console.log(response);
        this.setState({
          loading:false,
          nextItems: response.albums.paging.next,
          listItems: response.albums.data.map(photo => (
            <li className="col-3 float-left" key={photo.id}>
              <a href="http://localhost:3000/profile">
                <img src={photo.cover_photo.picture} alt={photo.name} />
                <p>
                  {photo.name} ({photo.count})
                </p>
              </a>
            </li>
          ))
        });
      })
      .catch(error => {});
      console.log(this.state);
  }

  nextlist() {
    this.setState({loading:true,});
    getMorePhotos(this.state.nextItems)

    .then(response => {
      console.log(response);
      this.setState({
        loading:false,
        nextItems: response.albums.paging.next,
        previousItems : response.albums.paging.previous,
        listItems: response.albums.data.map(photo => (
          
          <li className="col-3 float-left" key={photo.id}>
            {photo.cover_photo!==null ? (
              
            <a href="http://localhost:3000/profile">
            
          <img src={photo.cover_photo.picture} alt={photo.name} />
        
              
              <p>
                {photo.name} ({photo.count})
              </p>
            </a>
            ):( 
              <div>
          <img src={"data:image/jpeg;base64,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"} alt={photo.name} 
          style={{width: 150, height: "auto"}}
          />
        
              <p>
                {photo.name} ({photo.count})
              </p>
              </div>
        )}
          </li>
        
        ))
      });
    })
    .catch(error => {});
    console.log(this.state);
  }


  previouslist() {
    this.setState({loading:true,});
    getMorePhotos(this.state.previousItems)

    .then(response => {
      console.log(response);
      this.setState({
        loading:false,
        nextItems: response.albums.paging.next,
        previousItems : response.albums.paging.previous,
        listItems: response.albums.data.map(photo => (
          
          <li className="col-3 float-left" key={photo.id}>
            {photo.cover_photo!==null ? (
              
            <a href="http://localhost:3000/profile">
            
          <img src={photo.cover_photo.picture} alt={photo.name} />
        
              
              <p>
                {photo.name} ({photo.count})
              </p>
            </a>
            ):( 
              <div>
          <img src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0ODQ8NDQ0NFREWFhYRExMYHSggGholGxUVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OFhAQFS0dHR0uKy0rKystLS0rLS0rKystKysrLS0tLSsrLSsrKy0tKysrLTItLS0rLS0tLSsrNystLf/AABEIALgBEgMBIgACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAACAQADBAUG/8QAOBAAAgIBAQUDCQcEAwAAAAAAAAECEQMEBSExQVEScZEiI1JhcoGhscETMjNCstHhgpLw8UNic//EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAHxEBAQEBAAICAwEAAAAAAAAAAAERAiExQVEDEiIT/9oADAMBAAIRAxEAPwD6wxaLR6GENQqNQBotFooBotFMBKKWjUBDCo1ASjUKjUBKNR3tLs2c978iPVryn3I9PBoMUPy9p9Zb2ZvUi48PHp5z+7CTXVLd4nZx7Lyviox73b+B7tGox+9XHlw2OvzZG/ZSXzJqdFgxRuUsl8kmrb8D1qPP2nop5Gpx3tRrsc642hOrb5pY8UpaLR1ZGi0WjMILCxMjCgyMrIAWETCBGETCyCMgggYxjAc6EFCKMYqLQEo1Co1ASjUKjASjUUtASjFotARJvclbfBHtaDZyhUp759OUf5OLY2mu8r5bod/N/Q9ajn318LINFotFo5tDRaLRaANFoVGoDp6zQxyq1UZ8pdfUzw8uKUJOMlTXI+po6m0NGssbX3474vr6jfPWJY+fojEws7MCwsTCRRYRsDAjCJhYBZGJhZBAiIBjGMBzISAhIoSEgIaApaIhICUWilANFopaCDRS0Wgr6DQRrDj9lP3vediji0K81j9iPyOejhfbaUaiZckYRcpOkv8AKPE1W0J5HSbhHonvfeyzm1LXtTywj96UV3ySCtTif/JD+9HzhqN/5pr6hb+G9eotHzOHLKDuEnHu4eB7Wz9esnkTpT5Vwl/Jm8WLK7tGFRGYV8zr41myJek/jvOszubTXnsnev0o6jPRPTAsImFgFhY2BgFkYgsAhYiMgJCsxRDGMEcokEqCkJBEgEhIKKgGihQkBaLRkUqJRhGoD6TSLzWP2IfI5qBpV5vH7EPkcj3Hmro8La+ftZOwvuw3d8uf7HFoNG8sqe6Md8n9EcEnbbfFtvxPd2NjrDfpSk/Dd9Dtf5jE812MOnhBVCKj3Lf4nI43xV9+8RaOLbydpbPj2Xkxqmt8org11SPJi6aadNb0+jPq3G9z4Pc+4+Vo68XWK+k0ub7THGfNrf38GNnS2K/NP1TfyR3mc7MrUfObU/Hyd8f0o6Z3dqfj5P6f0o6bO89MiwsQWEFhYiMKAWJkYBZGVkYBIVkAxjGIGJBRUUNFQUVANCQUUBoSAhAJCQUIqEihR39kQjLLUkpLsN01au0S3IPZ0f4WP2IfI5Wr3dSpCPO6Oitl4PQf90v3O1ixRhFRiqiuCu+ZyGou2iUYVHBrNTHFHtPi/ux5yZBx7Q1Cx42/zSuMV6+vuPnWc2ozSyScpPfyXJLojt7M0HbayTXkLfFek+vcdp/MY9u9szE4YY3xlcn7+Hwo7DGws4262+c2p+Pk/p/SjqM9jbWGCipqKU3NJy5tU/2R47O/N2MUCMTCygsLEyMAMjKyABkEwgFkEyAYxjDAkVBRQGUKEAkJBQkAkJAQkA0VBQkVCR3tkSrNH1xkvhf0Ogjn0uXsZIT5Rkm+7n8CX0PqEJBi+gjzuiopEUDjz5VjjKcuEVf8HzmozyySc5cXwXJLoj1Nu5PJhDq3J+7/AGeZpcP2mSEOTe/u4s68TJrNdrZug7flzXkcl6f8HtUVJJUlSSpLoiM526smCwsbCyK8vbj8iC6zvwT/AHPEZ6m3MlzjH0Ytvvf+vieYduPTFBkYmFmkFhYmFhRYRsDALIJhYBZGJhZBjGMUUoRIgSEgISKEhIKEgEhIAkENCQBIoQkEqA97YuXtY3F3cHz6Ph9T0Txdh5KnOHpRTXu/38D2kcOp5bnokUiKZV5m1tNkyTi4Rcko8q42cezdJkhlUpwcUlLe64nrOSXFpe83aXVeJr9rmJikZSMyos4s8+zCUvRjJ+COU6G2MvZxNc5tR93F/L4lk2jwZybbbdt723xbAxMLPQ5iwsbCwAyMTCyAsLGwMKLCxsLALCxEZBDFMBBIJUAkJAEihISChIBCQUVANCQEJBDKgoqKObBlcJRmuMXff6j6fDlU4qUXaa/xHyqPV2C3eRW+ykt3K74nPueNWV7KEExybeJtz8WP/mv1SODZ342P2voz1dZoFmkpOTjUVGkk+bf1OPT7MjCcZqbfZd1SOk6mYznl6LZrJZrObTHz+1dT9pkpfdh5K9b5v/Oh7OtfmsvsS+R8ydPxz5Z6ZhYgs6siwsYWAWBjYWRRYWJhYBCxEYBCxMjAhjGIiFQSoqkJBKgGVBQkAkJBQkAkJAQgGihQkVCR7Owo+TkfWSXgv5PK02GWSShHi99vgl1Z7+g0zwwcW1JuTlaVckvoY7vjFjt2SyEs4tlZLJZLAVkslksDi178zl9iR83Z9LqcfbhKF12lV9D57VYJYpdmW/mmuDR1/HWenFZiEOjKhZbIAWFjYWQFhYmFhRYWJkYAZGJhAhTGIAUhShIqChAJFChAJCChIBISAhIBoQEc2DBPI6hFv18EveB6Wwob8kq5Rjfx/Y9ezr6PD9njjHmlcvafE5rOHV2tQrJZLJZFKyWSyWArJZLJYCs8rbkX5uXJdqL7+X1PTs4dVi+0xyh1W71S5F5uVK+cs1jz6eeP78WvXxXicVnfWVs1hs1gUjJZrCIyMrZAosLEwgFkEwsDEKYg4ykMUJFChECQgISKEhIMU26SbfRK2ehp9mZJb5+QvGXgS2QdNHc02hyZN9dmPpS3eCPU02ix496jb9KW9naRi9/S462m2bihxXbfWXDwO9FJKkkl0W5BRbMW60VksNmsgVksNmsC2aw2awLZrDZLAVmsNksBPfx3rodPPs/FPl2H1ju+HA7VkssuDxNRs7JDel211jx8Dpu1ue5/E+ns4s2GGTdOKfzXczc7+0x85Zj0tRsp8ccr/wCsv3POy45QdSi4v18+5m51KziWSyWSyhMLNZAIwsYWBDGMBxFMYCoSMYgqPR0mzZS3z8hdPzP9jGM93Fketp8EMaqEUvXzfezmRTHJokJGMAjWYwEslmMBrJZjAayWYwGslmMBrJZjASzWYwEs1mMBLDOKkqkk10atGMB52q2Wnvxun6Le73M8zJCUHUk4v1mMdOOrfDNgGsxjoiWYhgNZjGA//9k="} alt={photo.name} 
          style={{width: "auto", height: 80}}
          />
        
              <p>
                {photo.name} ({photo.count})
              </p>
              </div>
        )}
          </li>
        
        ))
      });
    })
    .catch(error => {});
    console.log(this.state);
  }

  render() {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-name">
              <h2>{this.props.currentUser.name}</h2>
              <p className="profile-email">{this.props.currentUser.email}</p>
            </div>
          </div>
          <h4 style={{ textAlign: "center" }}>Albuns</h4>
          {this.state.loading===true ? 
         <img src={"https://media.tenor.com/images/31b41d2ad4afd0bb55c508f13afcbcf4/tenor.gif"} alt="Loading"
          style={{width: 300, height: "auto"}}
          />
          
        :
          <ul>{this.state.listItems}</ul>
        }
        </div>
        <div className="Buttons-space">
        { (this.state.previousItems!==null && this.state.nextItems!==null) &&<button type="button" onClick={() => this.previouslist()}>
            Previous
          </button>}
          { (this.state.previousItems!==null && this.state.nextItems===null) &&<button type="button" onClick={() => this.previouslist()}>
            Begin
          </button>}
          
          { this.state.nextItems!==null && <button type="button" onClick={() => this.nextlist()}>
            Next
          </button> }
          
        </div>
      </div>
    );
  }
}

export default Photos;
