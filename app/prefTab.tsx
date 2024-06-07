import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const preferences = [
    { id: 1, label: 'Bakeries', flag: 'data:image/png;base64,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fYklmhsRYIJ9O3aoKkyz294j3iNuhLLFiGwj1JuQkFVEZUsY0CmNvJmtKEKExQp+NRyr5X1EWecbCKPvmxV5EbrdrdmEygoiEMb4FoKgLwTlUEyofl8GEMbZoj+LML/yhPw4XSdCvhPXiTDHbYnrRMgP07Ui5NbEtSJMrT/h2rfDFG8acr0IecmUCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCImQCNeWUNL9QFEJ2cHeys6GhHMh413ryCVkZyQfCgnZRRD3yk6EHqgjhLtlekJCdo+eshtZ4EC6ePfl8Qjh5hXBuZAJfK73iRonovsCYgHyCK13Zlt45B46kk7NBd3oaM+deDdzBglNONrzSgwIV5Q5cSofMQsxGvcisgChCTG6cRlCiI6f3+hIDtRsCR3FHvdG9WlCCx3FHhakvmO9NwqdZCkrSaVS47mPbP/MxJNtIlnG+Q6y3QwD9DnRUb8gSbcffsO/fsTTDlbZbzvUhfiG51WVuBhy4nQVFR6jrv5b9jvG0utsQHw4++ppLkB8KcuqSTyomFL6Zraxb6gbzm0BQl3OtvftFNaV4fqxeb3sV15A103REd6h2qtU06ugamVGkSeRSCQSiUQikUgkEolEIpFIpDn0P10yxJgLKJqVAAAAAElFTkSuQmCC' },
    { id: 2, label: 'Groceries', flag: 'data:image/png;base64,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' },
    { id: 3, label: 'French', flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ0AAAC7CAMAAABIKDvmAAAAilBMVEX///8nM3XhAA/gAAAdK3Fwdp3pZ2wlMXTkISo9R4LhAAvhAAVRWo03Qn97gaXrcXbjFSCmqsENIG0IHWyWmrUYJ3BiaZbW1+LkJi/mQEfxoqT62doAGWryq63N0N0qN3j4y82MkbAAEmjuiYztf4O+wdL2v8GeorzvlpnpZGjiChboV1vwmZvxpKaVedYrAAACIklEQVR4nO3V2VLiQACG0TYdFoNAQFFUhs3dGd//9QScgGV52bnoqvM9wN9VpzqdEI7dTEYX54kajkKbjet+mua347v7Xw6YlItZ2UtV2WlVoxurRA1ijPWfH/PL1bR3lrDWNYqEDWK9/r6+2Sa1yExj7/FwGu9cprXITqMoYrfZ3iTHyE+jiI9f00/b5BgZahTx+TBdJn4zMtWo4n75ZZoeI0eNIt7tltP+WjPW2F+OZfonNFONIq7D1YxGo/Eartv4UDLVeAvDNjDy1KjmYUXj2HtoBSNTjYIGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRo0aNCgQYMGDRoJNFY0jr2HIY2mqh+uezT+F/+GqxmNRuM1LBc0Go11CLM2PpUcNaq4W36Z0jgU/+2nyxYuR4Yah6sRwtOWxq74/LW9uaRRxMdmvJOcIzuN2D2tb7aJ347MNAbx4fv8cjVN6pGVxiBW6x8HTMrFrOylqnWNKlGDGGP98csRN5PRxXmihqNWNcZ1P03z2/HH/Wn3E7Z54m4PTqc2AAAAAElFTkSuQmCC' },
    { id: 4, label: 'Chinese', flag: 'https://image.similarpng.com/very-thumbnail/2020/06/China-flag-icon-on-transparent-background-PNG.png' },
    { id: 5, label: 'Italian', flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmQTf9f5rxE02Yh-G3kjd_Oj_24L51LPGHIA&s' },
    { id: 6, label: 'American', flag: 'https://cdn-icons-png.flaticon.com/512/555/555526.png' },
    { id: 7, label: 'Korean', flag: 'https://image.similarpng.com/very-thumbnail/2020/06/South-Korea-flag-icon-on-transparent-background-PNG.png' },
    { id: 8, label: 'Indian', flag: 'data:image/png;base64,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' },
    { id: 9, label: 'Spanish', flag: 'https://image.similarpng.com/very-thumbnail/2020/06/Spain-flag-icon-on-transparent-background-PNG.png' },
  ];

const PrefTab: React.FC = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);

  const togglePreference = (id: number) => {
    setSelectedPreferences(prevState =>
      prevState.includes(id) ? prevState.filter(item => item !== id) : [...prevState, id]
    );
  };

  return (
    <View style={styles.container}>
      {preferences.map(preference => (
        <Pressable
          key={preference.id}
          style={[
            styles.button,
            selectedPreferences.includes(preference.id) && styles.buttonSelected
          ]}
          onPress={() => togglePreference(preference.id)}
        >
          <Image source={{ uri: preference.flag }} style={styles.flag} />
          <Text style={styles.buttonText}>{preference.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width : 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 3,
    backgroundColor: 'white',
  },
  buttonSelected: {
    borderColor: '#49B379',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
  flag: {
    width: 18,
    height: 18,
    borderRadius: 3,
    marginRight: 8,
  },
});

export default PrefTab;
