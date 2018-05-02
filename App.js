import React, { Component } from'react';
import { Image } from 'react-native';
import { Container, Header, Content, Footer, Item, Input, Icon, Button, Text, Card, CardItem,Thumbnail,Left, Right, Body, Fab} from 'native-base';
import axios from 'axios';

class App extends Component {
constructor() {
super();
this.state = { restaurants: [],
active: false,
cari: '',
headerTitle: 'DAFTAR RESTO'
}}

componentDidMount() {
console.disableYellowBox = true;
}
klik = () => {
var url =`https://developers.zomato.com/api/v2.1/search?q=${this.state.cari}`;
var config = {
headers: {'user-key':'5148428fe250165753cd2c2a2a1e3cca'}
};

axios.get(url,config).then((ambilData) => {
console.log(ambilData.data.results);
this.setState({ restaurants: ambilData.data.restaurants })
});}


render() {
const data =
this.state.restaurants.map(resto => {

return 
<Card style={{ flex: 0 }}>
<CardItem>

<Left>
<Thumbnail source={{uri:`${resto.restaurant.thumb}`}} />
<Body>
<Text>{resto.restaurant.name}</Text>
<Text note>{resto.restaurant.location.city}</Text>
</Body>
</Left>

<Right>
<Text>Rp.
{resto.restaurant.average_cost_for_two /2}</Text>
</Right>
</CardItem>
<CardItem cardBody>

<Image
source={{uri:`${resto.restaurant.featured_image}`}}
style={{height:200, width:null, flex:1}}/>
</CardItem>
<CardItem>
<Left>

<Button
transparent textStyle={{ color: '#87838B' }}>
<Icon name="home"/>
<Text>{resto.restaurant.location.address}</Text>
</Button>
</Left>
</CardItem>
</Card>
});

return (
<Container>
<Header searchBar rounded>
<Item>

<Icon name="ios-search"/>
<Input placeholder="Cari"
onChangeText={(x) => { 
    this.setState({cari: x }) }}
value={this.state.cari}
/>

<Icon name="arrow-forward"
onPress={this.klik}/>
</Item>

<Button transparent>
<Text onPress={this.klik}> Cari </Text>
</Button>
</Header>
    
<Text style={{
textAlign: 'center',
padding: 10,
fontSize: 24,
fontWeight: '800' }} >
{this.state.headerTitle}
</Text>

<Content> {data} </Content>

<Fab
active={this.state.active}
direction="up"
containerStyle={{}}
style={{backgroundColor:'#5067FF' }}
position="bottomRight"
onPress={() => this.setState({
active: !this.state.active })}>

<Icon name="share"/>
<Button style={{backgroundColor:'#34A34F' }}>
<Icon name="logo-whatsapp"/>
</Button>

<Button style={{ backgroundColor:'#3B5998' }}>
<Icon name="logo-facebook"/>
</Button>

<Button disabled style={{ backgroundColor:'#DD5144'}}>
<Icon name="mail" />
</Button>
</Fab>
</Container>

);}}


export default App;