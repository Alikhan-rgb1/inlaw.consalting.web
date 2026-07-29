// AIFC / GK RK 5-digit business activity codes.
// Source: activities_5digit.txt
export interface AifcActivityCode {
  code: string;
  name: string;
}

export const AIFC_ACTIVITY_CODES: AifcActivityCode[] = [
  {
    "code": "01111",
    "name": "Cultivation of cereals and legumes, including seed production"
  },
  {
    "code": "01112",
    "name": "Cultivation of oil crop and their seeds"
  },
  {
    "code": "01120",
    "name": "Cultivation of rice"
  },
  {
    "code": "01131",
    "name": "Cultivation of potatoes and planting material"
  },
  {
    "code": "01132",
    "name": "Cultivation of vegetables, their seeds, and seedlings"
  },
  {
    "code": "01133",
    "name": "Cultivation of sugar beet and its seeds"
  },
  {
    "code": "01140",
    "name": "Cultivation of sugar cane"
  },
  {
    "code": "01150",
    "name": "Cultivation of tobacco"
  },
  {
    "code": "01161",
    "name": "Cultivation of raw cotton"
  },
  {
    "code": "01162",
    "name": "Cultivation of spinning crops and their seeds"
  },
  {
    "code": "01191",
    "name": "Cultivation of forage crops and their seeds"
  },
  {
    "code": "01192",
    "name": "Cultivation of flowers, seed production of flower crops"
  },
  {
    "code": "01199",
    "name": "Cultivation of other one- or two-year-old crops, not included in other groups"
  },
  {
    "code": "01210",
    "name": "Cultivation of grape"
  },
  {
    "code": "01220",
    "name": "Cultivation of tropical and subtropical fruits"
  },
  {
    "code": "01230",
    "name": "Growing citrus fruits"
  },
  {
    "code": "01240",
    "name": "Cultivation of pome and stone fruits"
  },
  {
    "code": "01250",
    "name": "Cultivation of other fruits, berries and nuts"
  },
  {
    "code": "01260",
    "name": "Cultivation of oil-bearing fruits"
  },
  {
    "code": "01270",
    "name": "Cultivation of crops for the production of beverages"
  },
  {
    "code": "01280",
    "name": "Cultivation of spices, medicinal and perfumery plants"
  },
  {
    "code": "01290",
    "name": "Cultivation of other perennial crops"
  },
  {
    "code": "01300",
    "name": "Plant reproduction"
  },
  {
    "code": "01410",
    "name": "Dairy cattle breeding"
  },
  {
    "code": "01420",
    "name": "Breeding of other cattle and buffaloes"
  },
  {
    "code": "01431",
    "name": "Breeding of horses"
  },
  {
    "code": "01432",
    "name": "Breeding and rearing of donkeys or mules"
  },
  {
    "code": "01440",
    "name": "Breeding of camels and other animals of the camel family"
  },
  {
    "code": "01450",
    "name": "Breeding of sheeps and goats"
  },
  {
    "code": "01460",
    "name": "Breeding of pigs"
  },
  {
    "code": "01471",
    "name": "Farming of poultry for meat, breeding poultry and young animals"
  },
  {
    "code": "01472",
    "name": "Egg production"
  },
  {
    "code": "01473",
    "name": "Mixed production, egg/meat"
  },
  {
    "code": "01474",
    "name": "Activities of poultry hatchery stations"
  },
  {
    "code": "01490",
    "name": "Breeding of other animal species"
  },
  {
    "code": "01500",
    "name": "Mixed agriculture"
  },
  {
    "code": "01611",
    "name": "Activities promoting crop production, other than the operation of irrigation systems"
  },
  {
    "code": "01612",
    "name": "Operation of irrigation systems"
  },
  {
    "code": "01620",
    "name": "Activities that promote animal husbandry"
  },
  {
    "code": "01630",
    "name": "Crop processing activities"
  },
  {
    "code": "01640",
    "name": "Seed processing activities for planting"
  },
  {
    "code": "01700",
    "name": "Hunting and trapping, including the provision of services in these areas"
  },
  {
    "code": "02100",
    "name": "Forestry and other forestry activities"
  },
  {
    "code": "02200",
    "name": "Logging"
  },
  {
    "code": "02300",
    "name": "Collection of wild non-wood products"
  },
  {
    "code": "02400",
    "name": "Services related to forestry and logging"
  },
  {
    "code": "03110",
    "name": "Marine fishing"
  },
  {
    "code": "03120",
    "name": "Freshwater fishing"
  },
  {
    "code": "03210",
    "name": "Marine fish farming"
  },
  {
    "code": "03220",
    "name": "Freshwater fish farming"
  },
  {
    "code": "05101",
    "name": "Open-pit coal mining"
  },
  {
    "code": "05102",
    "name": "Underground method coal mining"
  },
  {
    "code": "05103",
    "name": "Coal enrichment"
  },
  {
    "code": "05201",
    "name": "Lignite (brown coal) open pit mining"
  },
  {
    "code": "05202",
    "name": "Lignite (brown coal) underground mining"
  },
  {
    "code": "05203",
    "name": "Lignite (brown coal) enrichment"
  },
  {
    "code": "06100",
    "name": "Crude oil and associated gas production"
  },
  {
    "code": "06201",
    "name": "Natural gas production, except methane"
  },
  {
    "code": "06202",
    "name": "Methane extraction from coal deposits"
  },
  {
    "code": "07101",
    "name": "Iron ore underground mining"
  },
  {
    "code": "07102",
    "name": "Iron ore open pit mining"
  },
  {
    "code": "07103",
    "name": "Enrichment and agglomeration of iron ores"
  },
  {
    "code": "07210",
    "name": "Uranium and thorium ore mining"
  },
  {
    "code": "07291",
    "name": "Extraction and enrichment of aluminum-containing raw materials"
  },
  {
    "code": "07292",
    "name": "Copper ore mining and enrichment"
  },
  {
    "code": "07293",
    "name": "Mining and processing of lead-zinc ore"
  },
  {
    "code": "07294",
    "name": "Mining and processing of nickel-cobalt ores"
  },
  {
    "code": "07295",
    "name": "Mining and enrichment of titanium-magnesium raw materials (ores)"
  },
  {
    "code": "07296",
    "name": "Mining and processing of tin ore"
  },
  {
    "code": "07297",
    "name": "Mining and enrichment of antimony-mercury ores"
  },
  {
    "code": "07298",
    "name": "Extraction of precious metals and rare metal ores"
  },
  {
    "code": "07299",
    "name": "Mining and processing of other metal ores not included in other groups"
  },
  {
    "code": "08111",
    "name": "Extraction of finishing and building stone"
  },
  {
    "code": "08112",
    "name": "Mining of limestone, gypsum and chalk"
  },
  {
    "code": "08113",
    "name": "Shale mining"
  },
  {
    "code": "08121",
    "name": "Development of gravel and sand quarries"
  },
  {
    "code": "08122",
    "name": "Mining of clay and kaolin"
  },
  {
    "code": "08910",
    "name": "Extraction of mineral raw materials for the chemical industry and fertilizer production"
  },
  {
    "code": "08920",
    "name": "Peat extraction"
  },
  {
    "code": "08930",
    "name": "Salt mining"
  },
  {
    "code": "08991",
    "name": "Extraction of asbestos ore"
  },
  {
    "code": "08992",
    "name": "Mining and processing of non-metallic ores"
  },
  {
    "code": "08993",
    "name": "Extraction of raw materials for natural and artificial porous aggregates"
  },
  {
    "code": "08994",
    "name": "Extraction of raw materials for the glass industry"
  },
  {
    "code": "08995",
    "name": "Extraction of precious stones (except diamonds) and semi-precious stones, gems and amber"
  },
  {
    "code": "08996",
    "name": "Diamond mining"
  },
  {
    "code": "09100",
    "name": "Provision of services that contribute to the production of oil and natural gas"
  },
  {
    "code": "09900",
    "name": "Provision of services that contribute to the extraction of other minerals"
  },
  {
    "code": "10110",
    "name": "Meat processing and preservation"
  },
  {
    "code": "10120",
    "name": "Processing and preservation of poultry meat"
  },
  {
    "code": "10130",
    "name": "Production of meat and poultry products"
  },
  {
    "code": "10200",
    "name": "Processing and preservation of fish, crustaceans and shellfish"
  },
  {
    "code": "10310",
    "name": "Potato processing and canning"
  },
  {
    "code": "10320",
    "name": "Production of fruit and vegetable juices"
  },
  {
    "code": "10390",
    "name": "Other types of processing and canning of fruits and vegetables"
  },
  {
    "code": "10411",
    "name": "Production of crude oils and fats"
  },
  {
    "code": "10412",
    "name": "Production of refined oils and fats"
  },
  {
    "code": "10420",
    "name": "Production of margarine and similar edible fats"
  },
  {
    "code": "10511",
    "name": "Milk processing, except canning, and cheese production"
  },
  {
    "code": "10512",
    "name": "Production of canned milk"
  },
  {
    "code": "10520",
    "name": "Ice cream production"
  },
  {
    "code": "10611",
    "name": "Flour production"
  },
  {
    "code": "10612",
    "name": "Cereal production"
  },
  {
    "code": "10613",
    "name": "Production of food concentrates"
  },
  {
    "code": "10620",
    "name": "Production of starch and starch products"
  },
  {
    "code": "10710",
    "name": "Production of bakery and flour confectionery products of short-term storage"
  },
  {
    "code": "10720",
    "name": "Production of long-term storage crackers and biscuits, flour confectionery products"
  },
  {
    "code": "10730",
    "name": "Pasta production"
  },
  {
    "code": "10810",
    "name": "Sugar production"
  },
  {
    "code": "10820",
    "name": "Production of cocoa, chocolate and sugary confectionery products"
  },
  {
    "code": "10830",
    "name": "Tea and coffee production"
  },
  {
    "code": "10840",
    "name": "Production of spices and seasonings"
  },
  {
    "code": "10850",
    "name": "Production of ready-made food products"
  },
  {
    "code": "10860",
    "name": "Production of baby food and dietary food products"
  },
  {
    "code": "10891",
    "name": "Production of soups, broths and egg products"
  },
  {
    "code": "10892",
    "name": "Yeast production"
  },
  {
    "code": "10899",
    "name": "Production of other food products not included in other groupings"
  },
  {
    "code": "10910",
    "name": "Production of ready-made animal feed"
  },
  {
    "code": "10920",
    "name": "Production of ready-made pet food"
  },
  {
    "code": "11010",
    "name": "Distillation, rectification and mixing of alcoholic beverages"
  },
  {
    "code": "11021",
    "name": "Production of wine from grapes of own production"
  },
  {
    "code": "11022",
    "name": "Production of wine from grapes not of own production"
  },
  {
    "code": "11030",
    "name": "Production of cider and other fruit wines"
  },
  {
    "code": "11040",
    "name": "Production of other non-distilled beverages from fermented material"
  },
  {
    "code": "11050",
    "name": "Beer production"
  },
  {
    "code": "11060",
    "name": "Malt production"
  },
  {
    "code": "11070",
    "name": "Production of soft drinks, mineral waters and other bottled waters"
  },
  {
    "code": "12001",
    "name": "Tobacco fermentation"
  },
  {
    "code": "12002",
    "name": "Manufacture of tobacco products"
  },
  {
    "code": "13101",
    "name": "Preparation of cotton fiber"
  },
  {
    "code": "13102",
    "name": "Spinning of cotton fiber"
  },
  {
    "code": "13103",
    "name": "Preparation of wool fiber"
  },
  {
    "code": "13104",
    "name": "Spinning of wool fiber"
  },
  {
    "code": "13105",
    "name": "Preparation of flax and other vegetable fibers"
  },
  {
    "code": "13106",
    "name": "Spinning of flax and other vegetable fibers"
  },
  {
    "code": "13107",
    "name": "Preparation of silk fiber"
  },
  {
    "code": "13108",
    "name": "Silk yarn production"
  },
  {
    "code": "13109",
    "name": "Production of sewing threads"
  },
  {
    "code": "13201",
    "name": "Production of cotton fabrics"
  },
  {
    "code": "13202",
    "name": "Production of woolen fabrics"
  },
  {
    "code": "13203",
    "name": "Production of silk fabrics"
  },
  {
    "code": "13204",
    "name": "Production of linen fabrics"
  },
  {
    "code": "13209",
    "name": "Production of other fabrics"
  },
  {
    "code": "13300",
    "name": "Finishing of fabrics and textiles"
  },
  {
    "code": "13911",
    "name": "Production and processing of knitted fabrics"
  },
  {
    "code": "13912",
    "name": "Production of artificial fur"
  },
  {
    "code": "13920",
    "name": "Manufacture of finished textiles, except clothing"
  },
  {
    "code": "13930",
    "name": "Manufacture of carpets and carpet products"
  },
  {
    "code": "13941",
    "name": "Manufacture of ropes, twine, and nets"
  },
  {
    "code": "13942",
    "name": "Manufacture of nets and products made of rope"
  },
  {
    "code": "13950",
    "name": "Manufacture of non-woven textiles, except clothing"
  },
  {
    "code": "13960",
    "name": "Manufacture of other textile products for technical and industrial purposes"
  },
  {
    "code": "13991",
    "name": "Manufacture of textile haberdashery"
  },
  {
    "code": "13992",
    "name": "Manufacture of felting and felt products"
  },
  {
    "code": "13999",
    "name": "Manufacture of other textiles not included in other groupings"
  },
  {
    "code": "14110",
    "name": "Manufacture of leather clothing"
  },
  {
    "code": "14120",
    "name": "Production of workwear"
  },
  {
    "code": "14130",
    "name": "Manufacture of other outerwear"
  },
  {
    "code": "14140",
    "name": "Manufacture of underwear"
  },
  {
    "code": "14191",
    "name": "Manufacture of hats"
  },
  {
    "code": "14199",
    "name": "Manufacture of other types of clothing and accessories not included in other groupings"
  },
  {
    "code": "14200",
    "name": "Manufacture of fur products"
  },
  {
    "code": "14310",
    "name": "Manufacture of knitted hosiery"
  },
  {
    "code": "14390",
    "name": "Manufacture of other knitwear"
  },
  {
    "code": "15111",
    "name": "Tanning of leather"
  },
  {
    "code": "15112",
    "name": "Production of artificial leathers and film materials"
  },
  {
    "code": "15113",
    "name": "Fur dressing and dyeing"
  },
  {
    "code": "15121",
    "name": "Manufacture of travel accessories and similar products"
  },
  {
    "code": "15122",
    "name": "Manufacture of saddlery"
  },
  {
    "code": "15200",
    "name": "Shoe manufacturing"
  },
  {
    "code": "16101",
    "name": "Sawing and planing of wood"
  },
  {
    "code": "16102",
    "name": "Wood antiseptics"
  },
  {
    "code": "16103",
    "name": "Manufacture of prefabricated wooden coverings"
  },
  {
    "code": "16210",
    "name": "Manufacture of veneer, plywood, slabs and panels made of wood"
  },
  {
    "code": "16220",
    "name": "Production of prefabricated parquet coverings"
  },
  {
    "code": "16231",
    "name": "Manufacture of wooden products for construction"
  },
  {
    "code": "16232",
    "name": "Manufacture of prefabricated houses, mainly made of wood"
  },
  {
    "code": "16233",
    "name": "Manufacture of wooden container, all-cargo, and collapsible buildings and premises"
  },
  {
    "code": "16240",
    "name": "Manufacture of wooden containers"
  },
  {
    "code": "16291",
    "name": "Manufacture of various wooden products"
  },
  {
    "code": "16292",
    "name": "Manufacture of decorative wood products"
  },
  {
    "code": "16293",
    "name": "Manufacture of products made of cork, straw and materials for weaving"
  },
  {
    "code": "17110",
    "name": "Production of wood pulp"
  },
  {
    "code": "17120",
    "name": "Production of paper and cardboard"
  },
  {
    "code": "17211",
    "name": "Manufacture of corrugated paper and cardboard"
  },
  {
    "code": "17212",
    "name": "Manufacture of paper and cardboard containers"
  },
  {
    "code": "17220",
    "name": "Manufacture of paper products for household and sanitary purposes"
  },
  {
    "code": "17230",
    "name": "Manufacture of stationery"
  },
  {
    "code": "17240",
    "name": "Wallpaper production"
  },
  {
    "code": "17290",
    "name": "Manufacture of other paper and cardboard products"
  },
  {
    "code": "18110",
    "name": "Newspaper printing"
  },
  {
    "code": "18120",
    "name": "Other types of printing production"
  },
  {
    "code": "18130",
    "name": "Activities related to the preparation of materials for printing and distribution"
  },
  {
    "code": "18140",
    "name": "Bookbinding, finishing and related services"
  },
  {
    "code": "18201",
    "name": "Playback of sound recordings"
  },
  {
    "code": "18202",
    "name": "Playback of video recordings"
  },
  {
    "code": "18203",
    "name": "Reproduction of software and databases"
  },
  {
    "code": "19100",
    "name": "Production of coke oven products"
  },
  {
    "code": "19201",
    "name": "Production of refined petroleum products"
  },
  {
    "code": "19202",
    "name": "Peat agglomeration and production of peat briquettes"
  },
  {
    "code": "19203",
    "name": "Agglomeration and production of briquettes from coal"
  },
  {
    "code": "19204",
    "name": "Agglomeration and production of lignite briquettes"
  },
  {
    "code": "20110",
    "name": "Production of industrial gases"
  },
  {
    "code": "20120",
    "name": "Production of dyes and pigments"
  },
  {
    "code": "20130",
    "name": "Production of other basic inorganic chemicals"
  },
  {
    "code": "20141",
    "name": "Production of tannins"
  },
  {
    "code": "20142",
    "name": "Bioethanol production"
  },
  {
    "code": "20143",
    "name": "Production of acyclic and cyclic hydrocarbons from hydrocarbon raw materials"
  },
  {
    "code": "20144",
    "name": "Production of esters from hydrocarbon raw materials"
  },
  {
    "code": "20149",
    "name": "Production of other basic organic chemicals not included in other groupings"
  },
  {
    "code": "20151",
    "name": "Fertilizer production"
  },
  {
    "code": "20152",
    "name": "Production of nitrogen-containing compounds"
  },
  {
    "code": "20161",
    "name": "Production of plastics in primary forms, except polymers from hydrocarbon raw materials"
  },
  {
    "code": "20162",
    "name": "Production of polymers in primary forms from hydrocarbon raw materials"
  },
  {
    "code": "20170",
    "name": "Production of synthetic rubber in primary forms"
  },
  {
    "code": "20200",
    "name": "Production of pesticides and other agrochemical products"
  },
  {
    "code": "20301",
    "name": "Production of paints, varnishes, enamels and mineral pigments for them"
  },
  {
    "code": "20302",
    "name": "Production of ready-made solvents and thinners for paints and varnishes"
  },
  {
    "code": "20410",
    "name": "Manufacture of soaps and detergents, cleaning and polishing supplies"
  },
  {
    "code": "20420",
    "name": "Manufacture of perfumes and cosmetics"
  },
  {
    "code": "20511",
    "name": "Manufacture of explosives and other pyrotechnic products"
  },
  {
    "code": "20512",
    "name": "Manufacture of matches"
  },
  {
    "code": "20520",
    "name": "Glue production"
  },
  {
    "code": "20530",
    "name": "Production of essential oils"
  },
  {
    "code": "20591",
    "name": "Production of photographic materials"
  },
  {
    "code": "20592",
    "name": "Gelatin production"
  },
  {
    "code": "20593",
    "name": "Production of materials used in the decoration of textiles"
  },
  {
    "code": "20594",
    "name": "Production of carbon black, carbon nanotubes, nanofibers and other carbon nanomaterials"
  },
  {
    "code": "20599",
    "name": "Manufacture of other chemical products"
  },
  {
    "code": "20600",
    "name": "Production of artificial and synthetic fibers"
  },
  {
    "code": "21100",
    "name": "Manufacture of basic pharmaceutical products"
  },
  {
    "code": "21201",
    "name": "Pharmaceutical production"
  },
  {
    "code": "21202",
    "name": "Production of medicines for veterinary medicine"
  },
  {
    "code": "22111",
    "name": "Manufacture of rubber tires and chambers"
  },
  {
    "code": "22112",
    "name": "Restoration of rubber tires"
  },
  {
    "code": "22191",
    "name": "Manufacture of rubber technical products"
  },
  {
    "code": "22192",
    "name": "Manufacture of rubber sanitary and hygienic and medical products"
  },
  {
    "code": "22210",
    "name": "Manufacture of plastic plates, sheets, pipes and profiles"
  },
  {
    "code": "22220",
    "name": "Manufacture of plastic packages for goods"
  },
  {
    "code": "22231",
    "name": "Manufacture of plastic products used in construction"
  },
  {
    "code": "22232",
    "name": "Production of linoleum and other elastic floor coverings"
  },
  {
    "code": "22290",
    "name": "Manufacture of other plastic products"
  },
  {
    "code": "23110",
    "name": "Manufacture of flat glass"
  },
  {
    "code": "23120",
    "name": "Formation and processing of flat glass"
  },
  {
    "code": "23131",
    "name": "Manufacture of glass containers"
  },
  {
    "code": "23132",
    "name": "Manufacture of household products made of glass and glassware"
  },
  {
    "code": "23140",
    "name": "Glass fiber production"
  },
  {
    "code": "23191",
    "name": "Manufacture of electrotechnical and electrovacuum glass"
  },
  {
    "code": "23192",
    "name": "Manufacture of chemical laboratory glassware"
  },
  {
    "code": "23199",
    "name": "Manufacture of glass products not included in other groupings"
  },
  {
    "code": "23200",
    "name": "Manufacture of refractory products"
  },
  {
    "code": "23310",
    "name": "Production of ceramic coatings and plates"
  },
  {
    "code": "23320",
    "name": "Production of bricks, tiles and other construction products from baked clay"
  },
  {
    "code": "23411",
    "name": "Manufacture of household products made of porcelain and earthenware"
  },
  {
    "code": "23412",
    "name": "Manufacture of household pottery"
  },
  {
    "code": "23420",
    "name": "Manufacture of ceramic sanitary products"
  },
  {
    "code": "23430",
    "name": "Manufacture of ceramic electrical insulators and insulating fittings"
  },
  {
    "code": "23440",
    "name": "Manufacture of other technical ceramic products"
  },
  {
    "code": "23490",
    "name": "Manufacture of other ceramic products"
  },
  {
    "code": "23510",
    "name": "Cement production"
  },
  {
    "code": "23521",
    "name": "Production of lime"
  },
  {
    "code": "23522",
    "name": "Production of limestone and dolomite flour"
  },
  {
    "code": "23523",
    "name": "Production of building gypsum"
  },
  {
    "code": "23611",
    "name": "Production of precast reinforced concrete and concrete structures and products"
  },
  {
    "code": "23612",
    "name": "Manufacture of wall blocks"
  },
  {
    "code": "23613",
    "name": "Manufacture of silicate bricks"
  },
  {
    "code": "23620",
    "name": "Manufacture of gypsum products for construction purposes"
  },
  {
    "code": "23630",
    "name": "Production of ready-mixed concrete"
  },
  {
    "code": "23640",
    "name": "Production of building mortars"
  },
  {
    "code": "23650",
    "name": "Manufacture of asbestos cement and fibrous cement products"
  },
  {
    "code": "23690",
    "name": "Manufacture of other products made of concrete, gypsum and cement"
  },
  {
    "code": "23700",
    "name": "Cutting, processing and finishing of stone"
  },
  {
    "code": "23910",
    "name": "Manufacture of abrasive products"
  },
  {
    "code": "23991",
    "name": "Manufacture of asbestos products"
  },
  {
    "code": "23992",
    "name": "Production of mineral insulation materials"
  },
  {
    "code": "23993",
    "name": "Production of soft roofing and waterproofing materials"
  },
  {
    "code": "23994",
    "name": "Production of artificial and processing of natural porous fillers"
  },
  {
    "code": "23995",
    "name": "Manufacture of products made of bitumen and similar materials"
  },
  {
    "code": "23996",
    "name": "Manufacturing of products from non-metallic ores"
  },
  {
    "code": "24100",
    "name": "Production of cast iron, steel, and ferroalloys"
  },
  {
    "code": "24200",
    "name": "Manufacture of pipes, tubes, hollow profiles, fittings made of steel"
  },
  {
    "code": "24310",
    "name": "Cold drawing"
  },
  {
    "code": "24320",
    "name": "Cold rolling of tapes and narrow strips"
  },
  {
    "code": "24330",
    "name": "Cold stamping or bending"
  },
  {
    "code": "24340",
    "name": "Wire production by cold drawing"
  },
  {
    "code": "24410",
    "name": "Production of precious metals"
  },
  {
    "code": "24420",
    "name": "Aluminum production"
  },
  {
    "code": "24430",
    "name": "Production of lead, zinc and tin"
  },
  {
    "code": "24440",
    "name": "Copper production"
  },
  {
    "code": "24451",
    "name": "Nickel and cobalt production"
  },
  {
    "code": "24452",
    "name": "Production of titanium, titanium powder, magnesium, tungsten and molybdenum"
  },
  {
    "code": "24453",
    "name": "Antimony and mercury production"
  },
  {
    "code": "24454",
    "name": "Processing of non-ferrous metals and alloys"
  },
  {
    "code": "24455",
    "name": "Production of rare, rare earth metals and semiconductor materials"
  },
  {
    "code": "24460",
    "name": "Reprocessing of nuclear fuel"
  },
  {
    "code": "24511",
    "name": "Cast iron casting, except pipe Manufacture"
  },
  {
    "code": "24512",
    "name": "Manufacture of cast iron pipes"
  },
  {
    "code": "24520",
    "name": "Casting of steel"
  },
  {
    "code": "24530",
    "name": "Casting of light metals"
  },
  {
    "code": "24540",
    "name": "Casting of other non-ferrous metals"
  },
  {
    "code": "25111",
    "name": "Manufacture of building steel structures"
  },
  {
    "code": "25112",
    "name": "Manufacture of light metal structures"
  },
  {
    "code": "25113",
    "name": "Manufacture of building structures and products made of aluminum and aluminum alloys"
  },
  {
    "code": "25114",
    "name": "Manufacture of container and collapsible buildings and premises"
  },
  {
    "code": "25120",
    "name": "Manufacture of metal doors and windows"
  },
  {
    "code": "25210",
    "name": "Manufacture of radiators and central heating boilers"
  },
  {
    "code": "25290",
    "name": "Manufacture of other metal tanks and containers"
  },
  {
    "code": "25300",
    "name": "Manufacture of steam boilers, except central heating boilers"
  },
  {
    "code": "25400",
    "name": "Manufacture of weapons and ammunition"
  },
  {
    "code": "25501",
    "name": "Manufacture of finished metal products or semi-finished products by forging, pressing, stamping and profiling"
  },
  {
    "code": "25502",
    "name": "Manufacture of metal products by powder metallurgy"
  },
  {
    "code": "25610",
    "name": "Metal processing and coating of metals"
  },
  {
    "code": "25620",
    "name": "The main technological processes of mechanical engineering"
  },
  {
    "code": "25710",
    "name": "Manufacture of knives"
  },
  {
    "code": "25720",
    "name": "Manufacture of locks and hinges"
  },
  {
    "code": "25731",
    "name": "Manufacture of metal and woodworking tools"
  },
  {
    "code": "25732",
    "name": "Manufacture of agricultural and horticultural equipment"
  },
  {
    "code": "25739",
    "name": "Manufacture of tools not included in other groupings"
  },
  {
    "code": "25910",
    "name": "Manufacture of metal barrels and similar containers"
  },
  {
    "code": "25920",
    "name": "Manufacture of light metal packaging"
  },
  {
    "code": "25931",
    "name": "Manufacture of wire products"
  },
  {
    "code": "25932",
    "name": "Manufacture of chains and springs"
  },
  {
    "code": "25940",
    "name": "Manufacture of fasteners and threaded products"
  },
  {
    "code": "25991",
    "name": "Manufacture of metal sanitary equipment"
  },
  {
    "code": "25992",
    "name": "Manufacture of household utensils and kitchen utensils made of metal"
  },
  {
    "code": "25999",
    "name": "Manufacture of other finished metal products"
  },
  {
    "code": "26110",
    "name": "Manufacture of electronic elements"
  },
  {
    "code": "26120",
    "name": "Manufacture of electronic circuit boards"
  },
  {
    "code": "26200",
    "name": "Manufacture of computers and peripheral equipment"
  },
  {
    "code": "26301",
    "name": "Manufacture of television and radio equipment for industrial purposes"
  },
  {
    "code": "26302",
    "name": "Manufacture of equipment for cable telephone and telegraph communications"
  },
  {
    "code": "26400",
    "name": "Manufacture of electronic household appliances"
  },
  {
    "code": "26511",
    "name": "Manufacture of devices for measuring mechanical quantities"
  },
  {
    "code": "26512",
    "name": "Manufacture of electrical measuring devices"
  },
  {
    "code": "26513",
    "name": "Manufacture of radio measuring devices"
  },
  {
    "code": "26514",
    "name": "Manufacture of optical and opto-mechanical devices and equipment"
  },
  {
    "code": "26515",
    "name": "Manufacture of devices for physical research"
  },
  {
    "code": "26516",
    "name": "Manufacture of medical and surgical instruments"
  },
  {
    "code": "26517",
    "name": "Manufacture of equipment for positioning and monitoring systems of critical structures"
  },
  {
    "code": "26521",
    "name": "Manufacture of watches of all kinds"
  },
  {
    "code": "26522",
    "name": "Manufacture of time recording devices"
  },
  {
    "code": "26523",
    "name": "Manufacture of watch parts and accessories"
  },
  {
    "code": "26600",
    "name": "Manufacture of irradiating, electromedical and electrotherapeutic equipment"
  },
  {
    "code": "26701",
    "name": "Manufacture of optical devices"
  },
  {
    "code": "26702",
    "name": "Manufacture of photographic and film equipment"
  },
  {
    "code": "26800",
    "name": "Manufacture of magnetic and optical storage media"
  },
  {
    "code": "27110",
    "name": "Manufacture of electric motors, generators and transformers"
  },
  {
    "code": "27120",
    "name": "Manufacture of electrical distribution and control equipment"
  },
  {
    "code": "27200",
    "name": "Manufacture of batteries and accumulators"
  },
  {
    "code": "27310",
    "name": "Manufacture of fiber optic cables"
  },
  {
    "code": "27320",
    "name": "Manufacture of other electrical wires and cables"
  },
  {
    "code": "27330",
    "name": "Manufacture of electrical installation devices"
  },
  {
    "code": "27401",
    "name": "Manufacture of electric lamps"
  },
  {
    "code": "27402",
    "name": "Manufacture of lighting devices"
  },
  {
    "code": "27511",
    "name": "Manufacture of electric household appliances, except refrigerators and freezers"
  },
  {
    "code": "27512",
    "name": "Manufacture of household refrigerators and freezers"
  },
  {
    "code": "27520",
    "name": "Manufacture of non-electric household appliances"
  },
  {
    "code": "27901",
    "name": "Manufacture of electrode products"
  },
  {
    "code": "27902",
    "name": "Manufacture of electrical insulation products"
  },
  {
    "code": "27903",
    "name": "Manufacture of electrical signaling equipment"
  },
  {
    "code": "27909",
    "name": "Manufacture of other electrical equipment not included in other groupings"
  },
  {
    "code": "28111",
    "name": "Engine manufacturing"
  },
  {
    "code": "28112",
    "name": "Turbine manufacturing"
  },
  {
    "code": "28120",
    "name": "Manufacture of hydraulic and pneumatic equipment"
  },
  {
    "code": "28131",
    "name": "Manufacture of vacuum and air pumps"
  },
  {
    "code": "28132",
    "name": "Compressor Manufacture"
  },
  {
    "code": "28139",
    "name": "Manufacture of other pumps not included in other groupings"
  },
  {
    "code": "28140",
    "name": "Manufacture of other taps and valves"
  },
  {
    "code": "28151",
    "name": "Bearing Manufacture"
  },
  {
    "code": "28152",
    "name": "Manufacture of gears, gear elements and drives"
  },
  {
    "code": "28211",
    "name": "Manufacture of non-electric furnaces, burners and devices for furnaces"
  },
  {
    "code": "28212",
    "name": "Manufacture of electric furnaces"
  },
  {
    "code": "28221",
    "name": "Manufacture of cranes (except construction)"
  },
  {
    "code": "28222",
    "name": "Manufacture of cranes for construction"
  },
  {
    "code": "28223",
    "name": "Manufacture of continuous transport equipment"
  },
  {
    "code": "28224",
    "name": "Elevator manufacturing"
  },
  {
    "code": "28225",
    "name": "Manufacture of auto and electric loaders"
  },
  {
    "code": "28229",
    "name": "Manufacture of other lifting and transport equipment"
  },
  {
    "code": "28230",
    "name": "Manufacture of office equipment (excluding computers and peripheral equipment)"
  },
  {
    "code": "28240",
    "name": "Manufacture of manual mechanized tools"
  },
  {
    "code": "28251",
    "name": "Manufacture of refrigeration or freezing equipment"
  },
  {
    "code": "28252",
    "name": "Manufacture of air conditioners, fans"
  },
  {
    "code": "28291",
    "name": "Manufacture of weighing equipment (except high-precision laboratory equipment)"
  },
  {
    "code": "28292",
    "name": "Manufacture of filtration and purification equipment"
  },
  {
    "code": "28293",
    "name": "Manufacture of equipment for spraying and spraying liquids or powders"
  },
  {
    "code": "28294",
    "name": "Manufacture of packaging and wrapping machines"
  },
  {
    "code": "28295",
    "name": "Manufacture of equipment and apparatus for chemical processes"
  },
  {
    "code": "28296",
    "name": "Manufacture of drawing, marking and measuring tools"
  },
  {
    "code": "28299",
    "name": "Manufacture of other machinery and equipment, parts and assemblies"
  },
  {
    "code": "28301",
    "name": "Manufacture of agricultural and forestry machinery"
  },
  {
    "code": "28302",
    "name": "Manufacture of agricultural machinery"
  },
  {
    "code": "28303",
    "name": "Manufacture of equipment for animal husbandry and feed production"
  },
  {
    "code": "28304",
    "name": "Manufacture of logging and reclamation equipment"
  },
  {
    "code": "28411",
    "name": "Manufacture of laser metalworking machines and similar machines"
  },
  {
    "code": "28412",
    "name": "Manufacture of turning, boring, drilling and milling machines"
  },
  {
    "code": "28413",
    "name": "Manufacture of other metal cutting machines"
  },
  {
    "code": "28414",
    "name": "Manufacture of parts and accessories for metalworking machines"
  },
  {
    "code": "28491",
    "name": "Manufacture of machines for processing stone, wood and similar hard materials"
  },
  {
    "code": "28498",
    "name": "Manufacture of parts and accessories for other machine tools"
  },
  {
    "code": "28499",
    "name": "Manufacture of other machine tools not included in other groupings"
  },
  {
    "code": "28910",
    "name": "Manufacture of machinery and equipment for metallurgy"
  },
  {
    "code": "28921",
    "name": "Manufacture of mining equipment"
  },
  {
    "code": "28922",
    "name": "Manufacture of mining equipment"
  },
  {
    "code": "28923",
    "name": "Manufacture of construction machinery"
  },
  {
    "code": "28924",
    "name": "Manufacture of equipment for processing construction materials"
  },
  {
    "code": "28925",
    "name": "Manufacture of equipment for the peat industry"
  },
  {
    "code": "28930",
    "name": "Manufacture of machinery and equipment for the production and processing of food, beverages and tobacco products"
  },
  {
    "code": "28941",
    "name": "Manufacture of machinery and equipment for the textile industry"
  },
  {
    "code": "28942",
    "name": "Manufacture of machinery and equipment for the sewing and knitting industry"
  },
  {
    "code": "28943",
    "name": "Manufacture of sewing machines"
  },
  {
    "code": "28944",
    "name": "Manufacture of machinery and equipment for the footwear, fur, leather and leather goods industries"
  },
  {
    "code": "28945",
    "name": "Manufacture of special equipment for consumer service enterprises"
  },
  {
    "code": "28946",
    "name": "Manufacture of equipment for the Manufacture of chemical fiber"
  },
  {
    "code": "28950",
    "name": "Manufacture of machinery and equipment for the manufacture of paper and cardboard"
  },
  {
    "code": "28960",
    "name": "Manufacture of machinery and equipment for processing plastics and rubber"
  },
  {
    "code": "28991",
    "name": "Manufacture of oilfield and drilling exploration equipment"
  },
  {
    "code": "28992",
    "name": "Manufacture of oil and gas processing equipment"
  },
  {
    "code": "28993",
    "name": "Manufacture of special technological equipment for the electronic industry"
  },
  {
    "code": "28994",
    "name": "Manufacture of technological equipment for the glass industry"
  },
  {
    "code": "28995",
    "name": "Manufacture of technological equipment for the printing industry"
  },
  {
    "code": "28996",
    "name": "Manufacture of carousels, swings, shooting galleries and other attractions"
  },
  {
    "code": "28999",
    "name": "Manufacture of other special purpose machines"
  },
  {
    "code": "29101",
    "name": "Manufacture of automobiles, except for automobile engines"
  },
  {
    "code": "29102",
    "name": "Engine manufacturing"
  },
  {
    "code": "29201",
    "name": "Manufacture of car bodies"
  },
  {
    "code": "29202",
    "name": "Manufacture of trailers and semi-trailers"
  },
  {
    "code": "29310",
    "name": "Manufacture of electrical and electronic equipment for cars"
  },
  {
    "code": "29320",
    "name": "Manufacture of other car parts and accessories"
  },
  {
    "code": "30110",
    "name": "Construction of ships and floating facilities"
  },
  {
    "code": "30120",
    "name": "Construction of pleasure and sports boats"
  },
  {
    "code": "30200",
    "name": "Manufacture of railway locomotives and rolling stock"
  },
  {
    "code": "30301",
    "name": "Manufacture of aircrafts"
  },
  {
    "code": "30302",
    "name": "Manufacture of space aircraft"
  },
  {
    "code": "30400",
    "name": "Manufacture of military combat vehicles"
  },
  {
    "code": "30910",
    "name": "Motorcycle manufacturing"
  },
  {
    "code": "30921",
    "name": "Bicycle manufacturing"
  },
  {
    "code": "30922",
    "name": "Manufacture of wheelchairs for people with disabilities"
  },
  {
    "code": "30923",
    "name": "Manufacture of baby strollers"
  },
  {
    "code": "30990",
    "name": "Manufacture of other vehicles and equipment not included in other groupings"
  },
  {
    "code": "31011",
    "name": "Manufacture of chairs and other seating furniture"
  },
  {
    "code": "31012",
    "name": "Manufacture of furniture for offices and commercial enterprises, except chairs and other seating furniture"
  },
  {
    "code": "31020",
    "name": "Manufacture of kitchen furniture"
  },
  {
    "code": "31030",
    "name": "Manufacture of mattresses"
  },
  {
    "code": "31090",
    "name": "Manufacture of other furniture"
  },
  {
    "code": "32110",
    "name": "Coinage/issue of coins and medals"
  },
  {
    "code": "32120",
    "name": "Manufacture of jewelry and similar products"
  },
  {
    "code": "32130",
    "name": "Manufacture of jewelry and similar products"
  },
  {
    "code": "32200",
    "name": "Manufacture of musical instruments"
  },
  {
    "code": "32300",
    "name": "Manufacture of sporting goods"
  },
  {
    "code": "32400",
    "name": "Manufacture of games and toys"
  },
  {
    "code": "32501",
    "name": "Production of cements used in medicine"
  },
  {
    "code": "32502",
    "name": "Manufacture of medical and veterinary instruments, devices and equipment"
  },
  {
    "code": "32503",
    "name": "Manufacture of surgical and orthopedic devices"
  },
  {
    "code": "32504",
    "name": "Manufacture of medical, surgical, dental and veterinary furniture"
  },
  {
    "code": "32910",
    "name": "Manufacture of brooms and brushes"
  },
  {
    "code": "32991",
    "name": "Stationery production"
  },
  {
    "code": "32992",
    "name": "Manufacture of metal haberdashery products"
  },
  {
    "code": "32993",
    "name": "Manufacture of souvenirs"
  },
  {
    "code": "32999",
    "name": "Manufacture of other products"
  },
  {
    "code": "33111",
    "name": "Repair of metal tanks, tanks and containers"
  },
  {
    "code": "33112",
    "name": "Repair of radiators and central heating boilers"
  },
  {
    "code": "33113",
    "name": "Repair of steam boilers, except for central heating boilers"
  },
  {
    "code": "33114",
    "name": "Repair of firearms and artillery pieces"
  },
  {
    "code": "33119",
    "name": "Repair of other metal products"
  },
  {
    "code": "33121",
    "name": "Repair and maintenance of mechanical equipment"
  },
  {
    "code": "33122",
    "name": "Repair and maintenance of other general purpose equipment"
  },
  {
    "code": "33123",
    "name": "Repair and maintenance of machinery and equipment for agriculture and forestry"
  },
  {
    "code": "33124",
    "name": "Repair and maintenance of machine tools"
  },
  {
    "code": "33125",
    "name": "Repair and maintenance of other special purpose machinery and equipment"
  },
  {
    "code": "33126",
    "name": "Repair and maintenance of office machines and computer equipment"
  },
  {
    "code": "33131",
    "name": "Repair and maintenance of instruments and devices for measurement, testing and navigation"
  },
  {
    "code": "33132",
    "name": "Repair of control equipment"
  },
  {
    "code": "33133",
    "name": "Repair and maintenance of irradiating, electromedical and electrotherapeutic equipment"
  },
  {
    "code": "33134",
    "name": "Repair and maintenance of optical devices and photographic equipment"
  },
  {
    "code": "33141",
    "name": "Repair and maintenance of electric motors, generators and transformers"
  },
  {
    "code": "33142",
    "name": "Repair and maintenance of electrical distribution and control equipment"
  },
  {
    "code": "33143",
    "name": "Repair and maintenance of electric lighting equipment"
  },
  {
    "code": "33149",
    "name": "Repair and maintenance of other electrical equipment not included in other groupings"
  },
  {
    "code": "33151",
    "name": "Ship repair and maintenance"
  },
  {
    "code": "33152",
    "name": "Repair and maintenance of sports and pleasure boats"
  },
  {
    "code": "33160",
    "name": "Repair and maintenance of aircraft and spacecraft"
  },
  {
    "code": "33171",
    "name": "Repair of railway rolling stock"
  },
  {
    "code": "33172",
    "name": "Repair of trams, subway cars and trolleybuses"
  },
  {
    "code": "33179",
    "name": "Repair of other vehicles and equipment not included in other groupings"
  },
  {
    "code": "33190",
    "name": "Repair of other equipment"
  },
  {
    "code": "33200",
    "name": "Installation, installation of industrial machinery and equipment"
  },
  {
    "code": "35111",
    "name": "Electricity generation by thermal power plants"
  },
  {
    "code": "35112",
    "name": "Electricity generation by hydroelectric power plants"
  },
  {
    "code": "35113",
    "name": "Electric power generation by nuclear (nuclear) power plants"
  },
  {
    "code": "35114",
    "name": "Electricity generation by wind farms"
  },
  {
    "code": "35115",
    "name": "Electricity generation by solar power plants"
  },
  {
    "code": "35119",
    "name": "Production of electricity by other power plants"
  },
  {
    "code": "35121",
    "name": "Electric power transmission"
  },
  {
    "code": "35122",
    "name": "Technical dispatching of supply to the grid and consumption of electric energy, organization of balancing of production and consumption of electric energy"
  },
  {
    "code": "35123",
    "name": "Maintenance of the equipment of the National Electric Grid"
  },
  {
    "code": "35124",
    "name": "Ensuring the readiness of electric power to carry the load, regulation and redundancy of electric power"
  },
  {
    "code": "35130",
    "name": "Electricity distribution"
  },
  {
    "code": "35140",
    "name": "Electricity sales"
  },
  {
    "code": "35210",
    "name": "Production of gaseous fuels"
  },
  {
    "code": "35220",
    "name": "Distribution of gaseous fuels through pipelines"
  },
  {
    "code": "35230",
    "name": "Sale of gaseous fuels through pipelines"
  },
  {
    "code": "35302",
    "name": "Production of thermal energy by independent boiler houses"
  },
  {
    "code": "35303",
    "name": "Transmission and distribution of thermal energy"
  },
  {
    "code": "35304",
    "name": "Air conditioning"
  },
  {
    "code": "35305",
    "name": "Production of thermal energy by thermal power plants (including CHP plants)"
  },
  {
    "code": "35307",
    "name": "Sale of thermal energy"
  },
  {
    "code": "35308",
    "name": "Production of thermal energy by renewable and alternative energy sources"
  },
  {
    "code": "36000",
    "name": "Water intake, treatment and distribution"
  },
  {
    "code": "37001",
    "name": "Operation of networks and structures of drainage systems (sewerage)"
  },
  {
    "code": "37002",
    "name": "Sanitation activities"
  },
  {
    "code": "38110",
    "name": "Collection of non-hazardous waste"
  },
  {
    "code": "38120",
    "name": "Collection of hazardous waste"
  },
  {
    "code": "38210",
    "name": "Treatment and disposal of non-hazardous waste"
  },
  {
    "code": "38220",
    "name": "Hazardous waste treatment and disposal"
  },
  {
    "code": "38310",
    "name": "Disassembly of machines and equipment that cannot be restored"
  },
  {
    "code": "38321",
    "name": "Recycling of ferrous metal waste and scrap"
  },
  {
    "code": "38322",
    "name": "Recycling of non-ferrous metal waste and scrap"
  },
  {
    "code": "38323",
    "name": "Recycling of non-metallic waste"
  },
  {
    "code": "39000",
    "name": "Pollution control activities and other waste disposal services"
  },
  {
    "code": "41100",
    "name": "Development of construction projects"
  },
  {
    "code": "41201",
    "name": "Construction of residential buildings"
  },
  {
    "code": "41202",
    "name": "Construction of non-residential buildings, with the exception of stationary retail facilities of categories 1, 2"
  },
  {
    "code": "41203",
    "name": "Construction of stationary retail facilities of category 1"
  },
  {
    "code": "41204",
    "name": "Construction of stationary retail facilities of category 2"
  },
  {
    "code": "42111",
    "name": "Construction of roads and motorways"
  },
  {
    "code": "42112",
    "name": "Activities related to the organization of construction, reconstruction, repair, heavy traffic and maintenance of public roads (sections) of international and national importance"
  },
  {
    "code": "42120",
    "name": "Construction of railways and subways"
  },
  {
    "code": "42130",
    "name": "Construction of bridges and tunnels"
  },
  {
    "code": "42211",
    "name": "Construction of oil and gas main pipelines"
  },
  {
    "code": "42212",
    "name": "Construction of pipelines for water supply and sewerage systems"
  },
  {
    "code": "42219",
    "name": "Construction of other pipelines"
  },
  {
    "code": "42220",
    "name": "Construction of power lines and telecommunications"
  },
  {
    "code": "42910",
    "name": "Construction of water facilities"
  },
  {
    "code": "42990",
    "name": "Construction of other engineering structures not included in other groupings"
  },
  {
    "code": "43110",
    "name": "Dismantling and demolition of buildings and structures"
  },
  {
    "code": "43121",
    "name": "Earthworks"
  },
  {
    "code": "43122",
    "name": "Blasting operations"
  },
  {
    "code": "43123",
    "name": "Special work in the ground"
  },
  {
    "code": "43130",
    "name": "Exploratory drilling"
  },
  {
    "code": "43211",
    "name": "Electrical installation works for laying telecommunication, computer and television networks"
  },
  {
    "code": "43219",
    "name": "Other electrical work"
  },
  {
    "code": "43220",
    "name": "Installation of water supply, heating and air conditioning systems"
  },
  {
    "code": "43291",
    "name": "Insulation works"
  },
  {
    "code": "43298",
    "name": "Other construction and installation works not included in other groupings"
  },
  {
    "code": "43299",
    "name": "Start-up and commissioning of the installed equipment"
  },
  {
    "code": "43310",
    "name": "Plastering works"
  },
  {
    "code": "43320",
    "name": "Carpentry"
  },
  {
    "code": "43330",
    "name": "Flooring and wall cladding"
  },
  {
    "code": "43340",
    "name": "Painting and glass works"
  },
  {
    "code": "43390",
    "name": "Other finishing works"
  },
  {
    "code": "43910",
    "name": "Roofing works"
  },
  {
    "code": "43991",
    "name": "Construction of mines"
  },
  {
    "code": "43992",
    "name": "Waterproofing works"
  },
  {
    "code": "43993",
    "name": "Rental of construction equipment with an operator"
  },
  {
    "code": "43999",
    "name": "Other construction work requiring special qualifications"
  },
  {
    "code": "45111",
    "name": "Wholesale of cars and light vehicles"
  },
  {
    "code": "45112",
    "name": "Retail sale of cars and light vehicles in retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "45113",
    "name": "Retail sale of cars and light vehicles in retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "45191",
    "name": "Wholesale of other motor vehicles"
  },
  {
    "code": "45192",
    "name": "Retail sale of other motor vehicles in retail facilities with a retail area of less than 2000 sq.m"
  },
  {
    "code": "45193",
    "name": "Retail sale of other motor vehicles in retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "45201",
    "name": "Maintenance and repair of vehicles, with the exception of those carried out by service stations located on the roadside"
  },
  {
    "code": "45202",
    "name": "Maintenance and repair of vehicles by maintenance stations located on the roadside"
  },
  {
    "code": "45203",
    "name": "Battery charging activities for vehicles with electric motors"
  },
  {
    "code": "45310",
    "name": "Wholesale of automotive parts, components and accessories"
  },
  {
    "code": "45321",
    "name": "Retail sale of automotive parts, components and accessories in retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "45322",
    "name": "Retail sale of automotive parts, components and accessories in retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "45401",
    "name": "Wholesale of motorcycles, scooters, parts and accessories"
  },
  {
    "code": "45402",
    "name": "Retail sale of motorcycles, scooters, parts and accessories"
  },
  {
    "code": "45403",
    "name": "Maintenance and repair of motorcycles and scooters"
  },
  {
    "code": "46110",
    "name": "The activity of agents in the wholesale trade of agricultural raw materials, live animals, textile raw materials and semi-finished products"
  },
  {
    "code": "46120",
    "name": "Activities of agents in the wholesale trade of fuels, ores, metals and chemicals"
  },
  {
    "code": "46130",
    "name": "Activities of agents in the wholesale trade of wood and building materials"
  },
  {
    "code": "46140",
    "name": "The activities of agents in the wholesale trade of machinery, equipment, ships and aircraft"
  },
  {
    "code": "46150",
    "name": "The activities of agents in the wholesale trade of furniture, household goods, hardware and other metal products"
  },
  {
    "code": "46160",
    "name": "The activities of agents in the wholesale trade of textiles, clothing, footwear, leather and fur products"
  },
  {
    "code": "46170",
    "name": "The activities of agents in the wholesale trade of food, beverages and tobacco products"
  },
  {
    "code": "46180",
    "name": "The activities of agents specializing in the wholesale trade of certain types of goods or groups of goods not included in other groupings"
  },
  {
    "code": "46190",
    "name": "The activities of agents in the wholesale trade of a wide range of goods"
  },
  {
    "code": "46211",
    "name": "Wholesale of grain, seeds and animal feed"
  },
  {
    "code": "46212",
    "name": "Wholesale of unprocessed tobacco"
  },
  {
    "code": "46213",
    "name": "Wholesale of oilseeds"
  },
  {
    "code": "46220",
    "name": "Wholesale of flowers and other plants"
  },
  {
    "code": "46230",
    "name": "Wholesale of live animals"
  },
  {
    "code": "46240",
    "name": "Wholesale of hides and skins"
  },
  {
    "code": "46310",
    "name": "Wholesale of fruits and vegetables"
  },
  {
    "code": "46320",
    "name": "Wholesale of meat and meat products"
  },
  {
    "code": "46330",
    "name": "Wholesale of dairy products, eggs and edible oils and fats"
  },
  {
    "code": "46341",
    "name": "Wholesale of beverages in stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "46342",
    "name": "Wholesale of beverages in stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above), including wholesale food distribution centers"
  },
  {
    "code": "46350",
    "name": "Wholesale of tobacco products"
  },
  {
    "code": "46360",
    "name": "Wholesale of sugar, chocolate and sugary confectionery"
  },
  {
    "code": "46370",
    "name": "Wholesale of coffee, tea, cocoa and spices"
  },
  {
    "code": "46381",
    "name": "Wholesale of fish and fish products"
  },
  {
    "code": "46389",
    "name": "Wholesale of other food products"
  },
  {
    "code": "46390",
    "name": "Non-specialized wholesale of food, beverages and tobacco products"
  },
  {
    "code": "46410",
    "name": "Wholesale of textiles"
  },
  {
    "code": "46421",
    "name": "Wholesale of knitwear and hosiery"
  },
  {
    "code": "46422",
    "name": "Wholesale of clothing, except knitwear and hosiery"
  },
  {
    "code": "46423",
    "name": "Wholesale of shoes"
  },
  {
    "code": "46431",
    "name": "Wholesale of household electrical goods"
  },
  {
    "code": "46432",
    "name": "Wholesale of radio and television equipment"
  },
  {
    "code": "46440",
    "name": "Wholesale of ceramics and glass products, cleaning products"
  },
  {
    "code": "46450",
    "name": "Wholesale of perfumes and cosmetics"
  },
  {
    "code": "46461",
    "name": "Wholesale of pharmaceutical products, except for trade in medical equipment and orthopedic products"
  },
  {
    "code": "46462",
    "name": "Wholesale of pharmaceutical and medical products within the guaranteed volume of free medical care"
  },
  {
    "code": "46463",
    "name": "Wholesale of medical equipment and orthopedic products"
  },
  {
    "code": "46470",
    "name": "Wholesale of furniture, carpets and lighting equipment"
  },
  {
    "code": "46480",
    "name": "Wholesale of watches and jewelry"
  },
  {
    "code": "46491",
    "name": "Wholesale of office supplies"
  },
  {
    "code": "46492",
    "name": "Wholesale of musical instruments"
  },
  {
    "code": "46499",
    "name": "Wholesale of other non-food consumer goods not included in other groupings"
  },
  {
    "code": "46510",
    "name": "Wholesale of computers, peripheral computer equipment and software"
  },
  {
    "code": "46520",
    "name": "Wholesale of electronic and telecommunication equipment and their parts"
  },
  {
    "code": "46610",
    "name": "Wholesale of agricultural machinery, equipment, parts and accessories"
  },
  {
    "code": "46620",
    "name": "Wholesale of machine tools"
  },
  {
    "code": "46630",
    "name": "Wholesale of machinery and equipment for mining and construction"
  },
  {
    "code": "46640",
    "name": "Wholesale of machinery and equipment for the textile industry and sewing and knitting machines"
  },
  {
    "code": "46650",
    "name": "Wholesale of office furniture"
  },
  {
    "code": "46660",
    "name": "Wholesale of other office machinery and equipment"
  },
  {
    "code": "46690",
    "name": "Wholesale of other machinery and equipment"
  },
  {
    "code": "46711",
    "name": "Wholesale of crude oil and associated gas"
  },
  {
    "code": "46712",
    "name": "Wholesale of natural (combustible) gas"
  },
  {
    "code": "46713",
    "name": "Wholesale of hard coal"
  },
  {
    "code": "46714",
    "name": "Wholesale of lignite (brown coal)"
  },
  {
    "code": "46715",
    "name": "Wholesale of aviation gasoline and kerosene"
  },
  {
    "code": "46716",
    "name": "Wholesale of automobile gasoline"
  },
  {
    "code": "46717",
    "name": "Wholesale of diesel fuel"
  },
  {
    "code": "46718",
    "name": "Wholesale of heating oil"
  },
  {
    "code": "46719",
    "name": "Wholesale of other fuels"
  },
  {
    "code": "46721",
    "name": "Wholesale of ferrous and non-ferrous metal ores"
  },
  {
    "code": "46722",
    "name": "Wholesale of cast iron, steel and their casting"
  },
  {
    "code": "46723",
    "name": "Wholesale of rare, rare earth and non-ferrous metals and their casting"
  },
  {
    "code": "46724",
    "name": "Wholesale of precious metals"
  },
  {
    "code": "46731",
    "name": "Wholesale of flat glass"
  },
  {
    "code": "46732",
    "name": "Wholesale of cement, sand and gravel"
  },
  {
    "code": "46733",
    "name": "Wholesale of products made of concrete, cement, gypsum and similar materials"
  },
  {
    "code": "46734",
    "name": "Wholesale of paint and varnish products, wallpaper and floor coverings"
  },
  {
    "code": "46735",
    "name": "Wholesale of wood and wood processing products"
  },
  {
    "code": "46736",
    "name": "Wholesale of building metal structures"
  },
  {
    "code": "46737",
    "name": "Wholesale of sanitary equipment"
  },
  {
    "code": "46738",
    "name": "Wholesale of wall blocks"
  },
  {
    "code": "46740",
    "name": "Wholesale of hardware, plumbing and heating equipment and inventory"
  },
  {
    "code": "46751",
    "name": "Wholesale of chemicals and chemical products"
  },
  {
    "code": "46752",
    "name": "Wholesale of rubber products"
  },
  {
    "code": "46753",
    "name": "Wholesale of mineral fertilizers"
  },
  {
    "code": "46754",
    "name": "Wholesale of pesticides and other agrochemical products"
  },
  {
    "code": "46761",
    "name": "Wholesale of plastics in primary forms and synthetic rubber"
  },
  {
    "code": "46762",
    "name": "Wholesale of other intermediate products"
  },
  {
    "code": "46763",
    "name": "Wholesale of precious stones"
  },
  {
    "code": "46771",
    "name": "Wholesale of scrap and waste of ferrous and non-ferrous metals"
  },
  {
    "code": "46772",
    "name": "Wholesale of scrap of precious metals and precious stones"
  },
  {
    "code": "46779",
    "name": "Wholesale of other non-metallic waste and non-metallic scrap"
  },
  {
    "code": "46901",
    "name": "Wholesale of semi-precious stones"
  },
  {
    "code": "46902",
    "name": "Wholesale of stained oak"
  },
  {
    "code": "46903",
    "name": "Wholesale of a wide range of goods without any specification in retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above), including wholesale food distribution centers"
  },
  {
    "code": "46904",
    "name": "Wholesale of used equipment and materials"
  },
  {
    "code": "46905",
    "name": "Wholesale of carbon units"
  },
  {
    "code": "46908",
    "name": "Specialized wholesale of goods not included in other groupings"
  },
  {
    "code": "46909",
    "name": "Wholesale of a wide range of goods without any specification"
  },
  {
    "code": "47111",
    "name": "Retail trade mainly in food, beverages and tobacco products in non-specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47112",
    "name": "Retail trade mainly in food, beverages and tobacco products, in non-specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47191",
    "name": "Other retail trade in non-specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47192",
    "name": "Other retail trade in non-specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47211",
    "name": "Retail sale of fruits and vegetables in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47212",
    "name": "Retail sale of fruits and vegetables in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47221",
    "name": "Retail sale of poultry, game and products made from them in specialized stores that are retail facilities with a retail area of less than 2000 square meters.m"
  },
  {
    "code": "47222",
    "name": "Retail sale of poultry, game and products made from them in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47223",
    "name": "Other retail trade of meat and meat products in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47224",
    "name": "Other retail trade in meat and meat products in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47231",
    "name": "Retail sale of fish, crustaceans and shellfish in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47232",
    "name": "Retail sale of fish, crustaceans and shellfish in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47241",
    "name": "Retail sale of bakery, flour and sugar confectionery products in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47242",
    "name": "Retail sale of bakery, flour and sugar confectionery products in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47251",
    "name": "Retail sale of beverages in specialty stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47252",
    "name": "Retail sale of beverages in specialty stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47261",
    "name": "Retail sale of tobacco products in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47262",
    "name": "Retail sale of tobacco products in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47291",
    "name": "Other retail sale of food products in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47292",
    "name": "Other retail sale of food products in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47301",
    "name": "Retail sale of motor fuel in specialized stores, with the exception of those located on the roadside"
  },
  {
    "code": "47302",
    "name": "Retail sale of lubricants in specialty stores"
  },
  {
    "code": "47303",
    "name": "Retail sale of motor fuel in specialized stores located on the roadside"
  },
  {
    "code": "47411",
    "name": "Retail sale of computers, peripheral equipment and software in specialized stores that are retail facilities with a retail area of less than 2000 square meters.m"
  },
  {
    "code": "47412",
    "name": "Retail sale of computers, peripheral equipment and software in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47421",
    "name": "Retail sale of telecommunication equipment in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47422",
    "name": "Retail sale of telecommunication equipment in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47431",
    "name": "Retail sale of audio and video equipment in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47432",
    "name": "Retail sale of audio and video equipment in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47511",
    "name": "Retail sale of textiles in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47512",
    "name": "Retail sale of textiles in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47521",
    "name": "Retail sale of hardware, paints and varnishes and glass in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47522",
    "name": "Retail sale of hardware, paints and varnishes and glass in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47531",
    "name": "Retail sale of carpets, carpet products, wall and floor coverings in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47532",
    "name": "Retail sale of carpets, carpet products, wall and floor coverings in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47541",
    "name": "Retail sale of electrical household appliances in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47542",
    "name": "Retail sale of electrical household appliances in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47591",
    "name": "Retail sale of furniture in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47592",
    "name": "Retail sale of musical instruments and scores in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47593",
    "name": "Retail sale of furniture in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47594",
    "name": "Retail sale of musical instruments and scores in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47595",
    "name": "Retail sale of lighting fixtures and household goods not included in other groupings in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47599",
    "name": "Retail sale of lighting fixtures and household goods not included in other groupings in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47611",
    "name": "Retail sale of books in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47612",
    "name": "Retail sale of books in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47621",
    "name": "Retail sale of newspapers, magazines and stationery in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47622",
    "name": "Retail sale of newspapers, magazines and stationery in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47631",
    "name": "Retail sale of audio and video recordings in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47632",
    "name": "Retail sale of audio and video recordings in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47641",
    "name": "Retail sale of sports equipment in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47642",
    "name": "Retail sale of sports equipment in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47651",
    "name": "Retail sale of games and toys in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47652",
    "name": "Retail sale of games and toys in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47711",
    "name": "Retail sale of knitwear and hosiery in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47712",
    "name": "Retail sale of clothing, except knitwear and hosiery, in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47713",
    "name": "Retail sale of knitwear and hosiery in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47714",
    "name": "Retail sale of clothing, except knitwear and hosiery, in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47721",
    "name": "Retail sale of footwear in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47722",
    "name": "Retail sale of leather goods in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47723",
    "name": "Retail sale of footwear in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47724",
    "name": "Retail sale of leather goods in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47731",
    "name": "Retail sale of pharmaceutical products in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47732",
    "name": "Retail sale of pharmaceutical products in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47741",
    "name": "Retail sale of medical and orthopedic products in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47742",
    "name": "Retail sale of medical and orthopedic products in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47751",
    "name": "Retail sale of cosmetics and toiletries in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47752",
    "name": "Retail sale of cosmetics and toiletries in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47761",
    "name": "Retail sale of flowers and indoor plants in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47762",
    "name": "Retail sale of seeds and fertilizers in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47763",
    "name": "Retail sale of pets and pet food in specialty stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47764",
    "name": "Retail sale of flowers, indoor plants in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47765",
    "name": "Retail sale of seeds and fertilizers in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47766",
    "name": "Retail sale of pets and pet food in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47771",
    "name": "Retail sale of watches and jewelry in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47772",
    "name": "Retail sale of watches and jewelry in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47781",
    "name": "Retail sale of photographic, optical and precision equipment in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47782",
    "name": "Retail sale of bicycles in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47783",
    "name": "Retail of photographic, optical and precision equipment in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47784",
    "name": "Retail sale of bicycles in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47785",
    "name": "Other retail trade in specialized stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47789",
    "name": "Other retail trade in specialized stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47791",
    "name": "Retail sale of used goods in stores that are retail facilities with a retail area of less than 2000 sq.m."
  },
  {
    "code": "47792",
    "name": "Retail sale of used goods in stores that are retail facilities with a retail area of more than 2000 sq.m (2000 sq.m and above)"
  },
  {
    "code": "47811",
    "name": "Retail sale of food, beverages and tobacco products in stalls, stalls and kiosks"
  },
  {
    "code": "47812",
    "name": "Retail sale of food, beverages and tobacco products in the markets"
  },
  {
    "code": "47821",
    "name": "Retail sale of clothing, footwear and textiles in stalls, stalls and kiosks"
  },
  {
    "code": "47822",
    "name": "Retail sale of clothing, footwear and textiles in the markets"
  },
  {
    "code": "47891",
    "name": "Retail sale of other goods in tents, stalls and kiosks"
  },
  {
    "code": "47892",
    "name": "Retail sale of other goods in the markets"
  },
  {
    "code": "47910",
    "name": "Retail trade by ordering goods by mail or via the Internet"
  },
  {
    "code": "47991",
    "name": "Delivery retail trade"
  },
  {
    "code": "47992",
    "name": "Retail through network marketing"
  },
  {
    "code": "47999",
    "name": "Other retail trade outside stores"
  },
  {
    "code": "49100",
    "name": "The activity of passenger rail transport in intercity communication"
  },
  {
    "code": "49200",
    "name": "Freight rail transport activities"
  },
  {
    "code": "49311",
    "name": "Transportation by buses"
  },
  {
    "code": "49312",
    "name": "Tram transportation"
  },
  {
    "code": "49313",
    "name": "Trolleybus transportation"
  },
  {
    "code": "49314",
    "name": "Transportation by metro"
  },
  {
    "code": "49315",
    "name": "Light rail transportation"
  },
  {
    "code": "49319",
    "name": "Transportation by other scheduled modes of transport"
  },
  {
    "code": "49320",
    "name": "Taxi activity"
  },
  {
    "code": "49390",
    "name": "Activities of other passenger land transport not included in other groupings"
  },
  {
    "code": "49410",
    "name": "The activity of road freight transport"
  },
  {
    "code": "49420",
    "name": "Provision of moving services"
  },
  {
    "code": "49500",
    "name": "Pipeline transport activities"
  },
  {
    "code": "50100",
    "name": "Marine and coastal passenger transport activities"
  },
  {
    "code": "50200",
    "name": "Marine and coastal freight transport activities"
  },
  {
    "code": "50300",
    "name": "River passenger transport activities"
  },
  {
    "code": "50401",
    "name": "Activities of river freight transport, except for timber rafting"
  },
  {
    "code": "50402",
    "name": "Timber rafting"
  },
  {
    "code": "51101",
    "name": "Scheduled air passenger transport activities"
  },
  {
    "code": "51102",
    "name": "Non-scheduled air passenger transport activities"
  },
  {
    "code": "51211",
    "name": "Scheduled cargo air transport activities"
  },
  {
    "code": "51212",
    "name": "Non-scheduled cargo air transport activities"
  },
  {
    "code": "51220",
    "name": "Space transport activities"
  },
  {
    "code": "52101",
    "name": "Grain storage and storage"
  },
  {
    "code": "52102",
    "name": "Warehousing and storage of non-food products, except grain, oilseeds and oil"
  },
  {
    "code": "52103",
    "name": "Warehousing and storage of food products, except vegetables and fruits"
  },
  {
    "code": "52104",
    "name": "Oil storage"
  },
  {
    "code": "52105",
    "name": "Warehousing and storage of vegetables and fruits"
  },
  {
    "code": "52106",
    "name": "Storage of oilseeds"
  },
  {
    "code": "52211",
    "name": "Railway operation"
  },
  {
    "code": "52212",
    "name": "Highway operation"
  },
  {
    "code": "52213",
    "name": "Terminal operation"
  },
  {
    "code": "52214",
    "name": "Car parking operation"
  },
  {
    "code": "52215",
    "name": "Operation of trunk and other pipelines, including aqueducts"
  },
  {
    "code": "52216",
    "name": "Activities related to connecting (connecting) the pipeline to existing trunk and other pipelines"
  },
  {
    "code": "52219",
    "name": "Other auxiliary activities of land transport"
  },
  {
    "code": "52220",
    "name": "Auxiliary activities of water transport"
  },
  {
    "code": "52231",
    "name": "Regulation of the use of airspace"
  },
  {
    "code": "52232",
    "name": "Airport activities"
  },
  {
    "code": "52239",
    "name": "Other activities related to passenger and cargo transportation by air"
  },
  {
    "code": "52240",
    "name": "Cargo handling"
  },
  {
    "code": "52291",
    "name": "Freight forwarding services"
  },
  {
    "code": "52292",
    "name": "Technical supervision of transport"
  },
  {
    "code": "52299",
    "name": "Other forwarding activities"
  },
  {
    "code": "53100",
    "name": "Postal activities within the framework of the provision of public services"
  },
  {
    "code": "53200",
    "name": "Other postal and courier activities"
  },
  {
    "code": "55101",
    "name": "Provision of services by hotels with restaurants, with the exception of hotels located on the roadside"
  },
  {
    "code": "55102",
    "name": "Provision of services by hotels with restaurants, with the exception of hotels located on the roadside"
  },
  {
    "code": "55103",
    "name": "Provision of hotel services with restaurants for official events"
  },
  {
    "code": "55104",
    "name": "Provision of services by hotels located on the roadside"
  },
  {
    "code": "55200",
    "name": "Provision of accommodation for weekends and other short-term stays"
  },
  {
    "code": "55301",
    "name": "Provision of services by campgrounds, parking lots for vans and trailers for housing, except for those located on the roadside"
  },
  {
    "code": "55302",
    "name": "Provision of services by campgrounds, parking lots for vans and trailers for housing located on the roadside"
  },
  {
    "code": "55901",
    "name": "Provision of services by dormitories at boarding schools"
  },
  {
    "code": "55902",
    "name": "Provision of services by student dormitories"
  },
  {
    "code": "55909",
    "name": "Provision of services by other places of residence not included in other categories"
  },
  {
    "code": "56101",
    "name": "The activities of restaurants and the provision of food delivery services, with the exception of the activities of facilities located on the roadside"
  },
  {
    "code": "56102",
    "name": "The activities of restaurants and the provision of food delivery services by facilities located on the roadside"
  },
  {
    "code": "56210",
    "name": "Delivery of ready-made food to order"
  },
  {
    "code": "56291",
    "name": "Other types of catering outside settlements"
  },
  {
    "code": "56292",
    "name": "Other types of catering on passenger trains"
  },
  {
    "code": "56299",
    "name": "Other catering activities not included in other groupings"
  },
  {
    "code": "56300",
    "name": "Serving drinks"
  },
  {
    "code": "58110",
    "name": "Publishing books"
  },
  {
    "code": "58120",
    "name": "Publication of reference books and mailing lists"
  },
  {
    "code": "58130",
    "name": "Newspaper publishing"
  },
  {
    "code": "58140",
    "name": "Publishing of magazines and periodicals"
  },
  {
    "code": "58190",
    "name": "Other types of publishing activities"
  },
  {
    "code": "58210",
    "name": "Computer Game publishing"
  },
  {
    "code": "58290",
    "name": "Publication of other software"
  },
  {
    "code": "59110",
    "name": "Film, video and television production activities"
  },
  {
    "code": "59120",
    "name": "Activities to complete the creation of films, videos and television programs"
  },
  {
    "code": "59130",
    "name": "Distribution of films, videos and television programs"
  },
  {
    "code": "59140",
    "name": "Film screening activities"
  },
  {
    "code": "59200",
    "name": "Activities in the field of sound recording and publishing of musical works"
  },
  {
    "code": "60100",
    "name": "Radio broadcasting"
  },
  {
    "code": "60200",
    "name": "Activities for the creation and broadcasting of television programs"
  },
  {
    "code": "61101",
    "name": "Wired telecommunications for government agencies through a unified transport environment"
  },
  {
    "code": "61109",
    "name": "Other wired telecommunications"
  },
  {
    "code": "61201",
    "name": "Wireless telecommunication communication through a single transport environment"
  },
  {
    "code": "61202",
    "name": "Organization of broadcasting of television and radio programs through the network of the national television and radio broadcasting operator"
  },
  {
    "code": "61209",
    "name": "Other wireless telecommunications"
  },
  {
    "code": "61301",
    "name": "Activities in the field of satellite telecommunications for government agencies through a unified transport environment"
  },
  {
    "code": "61302",
    "name": "Satellite telecommunications activities for broadcasting purposes"
  },
  {
    "code": "61303",
    "name": "Activities in the field of satellite telecommunications for the organization of communications"
  },
  {
    "code": "61309",
    "name": "Other activities in the field of satellite telecommunications"
  },
  {
    "code": "61901",
    "name": "Activities for the distribution of TV and radio programs via the Internet"
  },
  {
    "code": "61909",
    "name": "Other telecommunications activities not included in other groupings"
  },
  {
    "code": "62011",
    "name": "Activities in the field of software code development and testing"
  },
  {
    "code": "62012",
    "name": "Software, software products, databases, Internet resources (websites), information systems maintenance"
  },
  {
    "code": "62013",
    "name": "Information technology project management activities"
  },
  {
    "code": "62014",
    "name": "Activities in the field of development of technical documentation and system architecture"
  },
  {
    "code": "62020",
    "name": "Consulting services in the field of information technology"
  },
  {
    "code": "62031",
    "name": "System maintenance of hardware and software complexes"
  },
  {
    "code": "62032",
    "name": "Activities in the field of installation and configuration of hardware and software complexes"
  },
  {
    "code": "62092",
    "name": "Cybersecurity activities"
  },
  {
    "code": "62099",
    "name": "Other information technology activities"
  },
  {
    "code": "63111",
    "name": "Activities related to the provision of server rooms (data processing centers) for use"
  },
  {
    "code": "63113",
    "name": "Digital mining activities"
  },
  {
    "code": "63114",
    "name": "Data processing activities"
  },
  {
    "code": "63115",
    "name": "Provision of software products, electronic information resources, mobile and other applications for use"
  },
  {
    "code": "63120",
    "name": "Activities of web portals"
  },
  {
    "code": "63910",
    "name": "Activities of news agencies"
  },
  {
    "code": "63991",
    "name": "Other activities related to the provision of computerized telephone services"
  },
  {
    "code": "63999",
    "name": "Other types of information service activities"
  },
  {
    "code": "64110",
    "name": "Activities of the National Bank"
  },
  {
    "code": "64191",
    "name": "The activities of banks, with the exception of the bank, which is the national development institute, and its lessor subsidiary"
  },
  {
    "code": "64192",
    "name": "Activities of savings banks"
  },
  {
    "code": "64193",
    "name": "The activities of the bank, which is a national development institute, and its lessor subsidiary"
  },
  {
    "code": "64199",
    "name": "Monetary intermediation of other financial institutions"
  },
  {
    "code": "64200",
    "name": "Activities of holding companies"
  },
  {
    "code": "64300",
    "name": "Activities of trust companies, investment funds and similar financial organizations"
  },
  {
    "code": "64911",
    "name": "Financial leasing, except for financial leasing of medical equipment"
  },
  {
    "code": "64912",
    "name": "Financial leasing of medical equipment"
  },
  {
    "code": "64921",
    "name": "Pawnshop activities"
  },
  {
    "code": "64922",
    "name": "Activities of special funds for financial support of private business entities"
  },
  {
    "code": "64929",
    "name": "Other types of loans not included in other groupings"
  },
  {
    "code": "64991",
    "name": "Financial and economic services provided to subjects of industrial and innovative activity and the agro-industrial complex"
  },
  {
    "code": "64992",
    "name": "Other financial services, financing in various sectors of the economy, investment activities"
  },
  {
    "code": "64999",
    "name": "Other types of financial services, except insurance and pension provision, not included in other groupings"
  },
  {
    "code": "65111",
    "name": "State life insurance"
  },
  {
    "code": "65112",
    "name": "Non-state life insurance"
  },
  {
    "code": "65121",
    "name": "State damage insurance"
  },
  {
    "code": "65122",
    "name": "Non-state damage insurance"
  },
  {
    "code": "65200",
    "name": "Reinsurance"
  },
  {
    "code": "65301",
    "name": "State pension provision"
  },
  {
    "code": "65302",
    "name": "Non-state pension provision"
  },
  {
    "code": "66111",
    "name": "Activities of commodity exchanges"
  },
  {
    "code": "66112",
    "name": "Activities related to financial market management"
  },
  {
    "code": "66113",
    "name": "Activities related to maintaining a system of registers of securities holders and participants in business partnerships"
  },
  {
    "code": "66121",
    "name": "Brokerage and dealer activities related to the management of assets of the National Fund, gold and foreign exchange assets of the National Bank, pension assets"
  },
  {
    "code": "66122",
    "name": "Brokerage activities in transactions with securities and commodities, with the exception of activities related to the management of assets of the National Fund, gold and foreign exchange assets of the National Bank, pension assets"
  },
  {
    "code": "66190",
    "name": "Other ancillary activities in the field of financial services, other than insurance and pension provision"
  },
  {
    "code": "66210",
    "name": "Assessment of insurance risks and losses"
  },
  {
    "code": "66220",
    "name": "Activities of insurance agents and brokers"
  },
  {
    "code": "66290",
    "name": "Other ancillary insurance and pension provision activities"
  },
  {
    "code": "66301",
    "name": "Asset management activities of the National Fund, gold and foreign exchange assets of the National Bank, pension assets"
  },
  {
    "code": "66302",
    "name": "Activities related to the trust management of the fund's asset portfolio"
  },
  {
    "code": "68101",
    "name": "Purchase and sale of apartment and residential buildings (mansions)"
  },
  {
    "code": "68102",
    "name": "Purchase and sale of other real estate"
  },
  {
    "code": "68201",
    "name": "Rent (sublease) and management of own or leased residential real estate"
  },
  {
    "code": "68202",
    "name": "Rent (sublease) and management of own or leased business center, office space, administrative building"
  },
  {
    "code": "68203",
    "name": "Lease (sublease) and management of own or leased trading market"
  },
  {
    "code": "68204",
    "name": "Rent and management of own commercial real estate and multifunctional complexes in trade activities"
  },
  {
    "code": "68205",
    "name": "Lease (sublease) and management of leased commercial real estate and leased multifunctional complexes in trading activities"
  },
  {
    "code": "68206",
    "name": "Rent (sublease) and management of own or leased built-in, attached non-residential premises in residential buildings"
  },
  {
    "code": "68207",
    "name": "Rent (sublease) and management of own or leased exhibition hall, conference rooms"
  },
  {
    "code": "68208",
    "name": "Lease (sublease) and management of own or leased warehouse premises"
  },
  {
    "code": "68209",
    "name": "Lease (sublease) and management of own or leased other real estate not included in other groupings"
  },
  {
    "code": "68311",
    "name": "Intermediary services in the purchase, sale and rental of real estate for industrial and technical purposes"
  },
  {
    "code": "68312",
    "name": "Intermediary services in the purchase, sale and rental of housing and other non-industrial real estate"
  },
  {
    "code": "68321",
    "name": "Property management for remuneration or on a contractual basis"
  },
  {
    "code": "68322",
    "name": "Provision of measures for the operation of the \"Reference Center\""
  },
  {
    "code": "69101",
    "name": "Law practice"
  },
  {
    "code": "69102",
    "name": "Notary activity"
  },
  {
    "code": "69109",
    "name": "Other legal activities"
  },
  {
    "code": "69201",
    "name": "Financial audit activities"
  },
  {
    "code": "69202",
    "name": "Accounting activities"
  },
  {
    "code": "69203",
    "name": "Consulting in the field of taxation"
  },
  {
    "code": "69204",
    "name": "Activities related to insolvency and debt collection"
  },
  {
    "code": "69205",
    "name": "Activities in the field of accounting, tax accounting and treasury operations for the national management holding"
  },
  {
    "code": "70101",
    "name": "Activities of parent companies related to the implementation of the state policy of industrial and innovative development"
  },
  {
    "code": "70109",
    "name": "Activities of other parent companies"
  },
  {
    "code": "70210",
    "name": "Relationship and public relations activities"
  },
  {
    "code": "70221",
    "name": "Consulting on business and management issues"
  },
  {
    "code": "70222",
    "name": "Advisory support of concession projects and public-private partnership projects"
  },
  {
    "code": "71111",
    "name": "Activities in the field of architecture for nuclear industry and nuclear power facilities"
  },
  {
    "code": "71112",
    "name": "Activities in the field of architecture, with the exception of nuclear industry and nuclear energy facilities"
  },
  {
    "code": "71121",
    "name": "Activities in the field of engineering and technical design, with the exception of nuclear industry and nuclear energy facilities"
  },
  {
    "code": "71122",
    "name": "Geological exploration activities (without scientific research and development)"
  },
  {
    "code": "71123",
    "name": "Geodetic activities"
  },
  {
    "code": "71124",
    "name": "Land use planning"
  },
  {
    "code": "71125",
    "name": "Activities in the field of cartography"
  },
  {
    "code": "71126",
    "name": "Activities in the field of engineering surveys and provision of technical advice in this field for nuclear industry and nuclear power facilities"
  },
  {
    "code": "71127",
    "name": "Activities related to the provision of engineering and technical advice"
  },
  {
    "code": "71128",
    "name": "Activities in the field of technical regulation, standardization, metrology and conformity assessment"
  },
  {
    "code": "71201",
    "name": "Activities of sanitary and epidemiological organizations"
  },
  {
    "code": "71202",
    "name": "Activities of health education organizations"
  },
  {
    "code": "71203",
    "name": "The activities of oil refineries for the implementation of laboratory tests and analyses"
  },
  {
    "code": "71204",
    "name": "Laboratory and analytical research in the geological industry"
  },
  {
    "code": "71205",
    "name": "Activities related to the production of forensic examinations and research, except for medical"
  },
  {
    "code": "71209",
    "name": "Activities of other institutions carrying out technical tests and analyses"
  },
  {
    "code": "72110",
    "name": "Scientific research and experimental developments in the field of biotechnology"
  },
  {
    "code": "72191",
    "name": "Scientific research and experimental developments in the field of design, construction, repair, maintenance and diagnostics of highways and bridge structures"
  },
  {
    "code": "72192",
    "name": "Scientific research, experimental methodological and development work in the geological industry"
  },
  {
    "code": "72193",
    "name": "Scientific research and development in the field of space activities"
  },
  {
    "code": "72194",
    "name": "Research and experimental developments in the field of peaceful use of atomic energy"
  },
  {
    "code": "72195",
    "name": "Research and development in the field of anti-infective drugs"
  },
  {
    "code": "72199",
    "name": "Other research and development in the field of natural and technical sciences"
  },
  {
    "code": "72201",
    "name": "Applied research in the field of social sciences and humanities aimed at promoting the development of domestic industries"
  },
  {
    "code": "72202",
    "name": "Applied research in the field of social sciences and humanities aimed at the development of the industry"
  },
  {
    "code": "72203",
    "name": "Research and experimental developments in the field of defense and national security"
  },
  {
    "code": "72204",
    "name": "Interdisciplinary research and development in the field of economic, budgetary and strategic planning"
  },
  {
    "code": "72209",
    "name": "Research and experimental developments in the field of social sciences and humanities, not included in other groupings"
  },
  {
    "code": "73110",
    "name": "Activities of advertising agencies"
  },
  {
    "code": "73120",
    "name": "Advertising in the media"
  },
  {
    "code": "73200",
    "name": "Market research and public opinion research"
  },
  {
    "code": "74100",
    "name": "Specialized design activities"
  },
  {
    "code": "74200",
    "name": "Activities in the field of photography"
  },
  {
    "code": "74300",
    "name": "Interpretation and translation activities"
  },
  {
    "code": "74901",
    "name": "Activities of the Hydrometeorological Service"
  },
  {
    "code": "74902",
    "name": "Accreditation in the field of conformity assessment"
  },
  {
    "code": "74903",
    "name": "The activities of departmental services dealing with innovative technologies (medical, educational, consulting, etc.)"
  },
  {
    "code": "74909",
    "name": "Other professional, scientific and technical activities not included in other groupings"
  },
  {
    "code": "75000",
    "name": "Veterinary activities"
  },
  {
    "code": "77111",
    "name": "Rental of passenger cars and light vehicles"
  },
  {
    "code": "77112",
    "name": "Leasing of passenger cars and light vehicles"
  },
  {
    "code": "77121",
    "name": "Rental of trucks"
  },
  {
    "code": "77122",
    "name": "Leasing of trucks"
  },
  {
    "code": "77210",
    "name": "Rental and leasing of entertainment and sports equipment"
  },
  {
    "code": "77220",
    "name": "Video cassettes and discs rental"
  },
  {
    "code": "77290",
    "name": "Rental and leasing of other personal consumption items and household goods"
  },
  {
    "code": "77311",
    "name": "Rent of agricultural machinery and equipment"
  },
  {
    "code": "77312",
    "name": "Leasing of agricultural machinery and equipment"
  },
  {
    "code": "77321",
    "name": "Rental of construction machinery and equipment"
  },
  {
    "code": "77322",
    "name": "Leasing of construction machinery and equipment"
  },
  {
    "code": "77331",
    "name": "Rental of computer and peripheral equipment for an infotelecommunication system"
  },
  {
    "code": "77332",
    "name": "Leasing of computer and peripheral equipment for an infotelecommunication system"
  },
  {
    "code": "77338",
    "name": "Rental of other office machinery and equipment"
  },
  {
    "code": "77339",
    "name": "Leasing of other office machinery and equipment"
  },
  {
    "code": "77341",
    "name": "Rental of water vehicles and equipment"
  },
  {
    "code": "77342",
    "name": "Leasing of water vehicles and equipment"
  },
  {
    "code": "77351",
    "name": "Rental of air vehicles and equipment"
  },
  {
    "code": "77352",
    "name": "Leasing of air vehicles and equipment"
  },
  {
    "code": "77391",
    "name": "Rental of other machinery, equipment and tangible assets not included in other groupings"
  },
  {
    "code": "77392",
    "name": "Leasing of other machinery, equipment and tangible assets not included in other groupings"
  },
  {
    "code": "77400",
    "name": "Leasing of intellectual property products and similar products, other than copyrighted works"
  },
  {
    "code": "78100",
    "name": "The activities of employment agencies"
  },
  {
    "code": "78200",
    "name": "The activities of temporary employment agencies"
  },
  {
    "code": "78301",
    "name": "Other activities related to the provision of human resources (personnel), except for the activities of organizations established by national companies"
  },
  {
    "code": "78302",
    "name": "The activities of organizations established by national companies to provide technical and support personnel for the maintenance of strategic facilities"
  },
  {
    "code": "78303",
    "name": "HR management activities for the national management holding"
  },
  {
    "code": "79110",
    "name": "Activities of travel agencies"
  },
  {
    "code": "79120",
    "name": "Activities of tourist operators"
  },
  {
    "code": "79900",
    "name": "Other booking services and related activities"
  },
  {
    "code": "80101",
    "name": "Activities of private security services"
  },
  {
    "code": "80102",
    "name": "Activities of security organizations established by national companies"
  },
  {
    "code": "80200",
    "name": "Activities in the field of security systems"
  },
  {
    "code": "80300",
    "name": "Investigative activities"
  },
  {
    "code": "81101",
    "name": "Comprehensive maintenance of residential facilities"
  },
  {
    "code": "81102",
    "name": "Comprehensive maintenance of commercial facilities"
  },
  {
    "code": "81211",
    "name": "General cleaning of residential buildings"
  },
  {
    "code": "81212",
    "name": "General cleaning of commercial buildings"
  },
  {
    "code": "81220",
    "name": "Other (specialized) cleaning of buildings, cleaning of industrial machinery and equipment"
  },
  {
    "code": "81290",
    "name": "Other cleaning activities"
  },
  {
    "code": "81300",
    "name": "Landscaping activities"
  },
  {
    "code": "82110",
    "name": "Activities for the provision of comprehensive office administrative services"
  },
  {
    "code": "82190",
    "name": "Copying, document preparation and other specialized office support activities"
  },
  {
    "code": "82200",
    "name": "Activities of telephone information services"
  },
  {
    "code": "82300",
    "name": "Organization of conferences and trade exhibitions"
  },
  {
    "code": "82911",
    "name": "Activities of the State Credit Bureau"
  },
  {
    "code": "82912",
    "name": "The activities of payment collection agencies and credit bureaus, with the exception of the State"
  },
  {
    "code": "82920",
    "name": "Packaging"
  },
  {
    "code": "82990",
    "name": "Other activities related to the provision of ancillary commercial services, not included in other groupings"
  },
  {
    "code": "84111",
    "name": "Activities of the republican governing bodies"
  },
  {
    "code": "84112",
    "name": "Activities of regional government bodies"
  },
  {
    "code": "84113",
    "name": "Activities of local governments"
  },
  {
    "code": "84114",
    "name": "Activities of rural and village government bodies"
  },
  {
    "code": "84115",
    "name": "Tax-related activities"
  },
  {
    "code": "84116",
    "name": "Customs activities"
  },
  {
    "code": "84117",
    "name": "Activities in the field of statistics and sociology"
  },
  {
    "code": "84120",
    "name": "Regulation of the activities of health care, education, culture and other social services, except social security"
  },
  {
    "code": "84130",
    "name": "Regulation and promotion of effective economic activity"
  },
  {
    "code": "84210",
    "name": "International activities"
  },
  {
    "code": "84220",
    "name": "Defense activities"
  },
  {
    "code": "84230",
    "name": "Activities in the field of justice"
  },
  {
    "code": "84240",
    "name": "Public order and security activities"
  },
  {
    "code": "84250",
    "name": "Emergency safety activities"
  },
  {
    "code": "84300",
    "name": "Activities in the field of compulsory social insurance"
  },
  {
    "code": "85100",
    "name": "Pre-school education"
  },
  {
    "code": "85200",
    "name": "Primary education (1st level)"
  },
  {
    "code": "85310",
    "name": "Basic and general secondary education"
  },
  {
    "code": "85321",
    "name": "Vocational and technical education"
  },
  {
    "code": "85322",
    "name": "Secondary specialized education"
  },
  {
    "code": "85410",
    "name": "Post-secondary education"
  },
  {
    "code": "85421",
    "name": "Higher education"
  },
  {
    "code": "85422",
    "name": "Postgraduate education"
  },
  {
    "code": "85510",
    "name": "Education in the field of sports and recreation"
  },
  {
    "code": "85520",
    "name": "Cultural education"
  },
  {
    "code": "85530",
    "name": "Activities of vehicle driver training schools"
  },
  {
    "code": "85591",
    "name": "Activities of evening general education schools"
  },
  {
    "code": "85592",
    "name": "Types of education provided by national companies and their subsidiaries"
  },
  {
    "code": "85599",
    "name": "Other educational activities not included in other groupings"
  },
  {
    "code": "85601",
    "name": "Educational support activities provided by national companies and their subsidiaries"
  },
  {
    "code": "85609",
    "name": "Other support activities in the field of education"
  },
  {
    "code": "86101",
    "name": "The activities of general hospitals and specialized hospitals"
  },
  {
    "code": "86102",
    "name": "Activities of maternity hospitals"
  },
  {
    "code": "86103",
    "name": "Activities of sanatorium-resort organizations"
  },
  {
    "code": "86104",
    "name": "Activities of leper colonies"
  },
  {
    "code": "86109",
    "name": "Activities of other medical institutions with inpatient facilities"
  },
  {
    "code": "86210",
    "name": "General medical practice"
  },
  {
    "code": "86220",
    "name": "Special medical practice"
  },
  {
    "code": "86230",
    "name": "Dental activities"
  },
  {
    "code": "86901",
    "name": "Activities related to the production of forensic medical examinations and research"
  },
  {
    "code": "86909",
    "name": "Other health care activities not included in other groupings"
  },
  {
    "code": "87100",
    "name": "Provision of special social services with accommodation and patient care by secondary medical personnel"
  },
  {
    "code": "87200",
    "name": "Provision of special social services with accommodation for persons suffering from mental disorders (diseases), mental retardation and physical disabilities, alcohol or drug addiction"
  },
  {
    "code": "87300",
    "name": "Provision of special social services with accommodation for elderly citizens and persons with disabilities"
  },
  {
    "code": "87900",
    "name": "Provision of other social services with accommodation"
  },
  {
    "code": "88100",
    "name": "Provision of special social services without accommodation for elderly citizens and persons with disabilities"
  },
  {
    "code": "88910",
    "name": "Day care for children"
  },
  {
    "code": "88990",
    "name": "Provision of other social services without accommodation, not included in other groupings"
  },
  {
    "code": "90011",
    "name": "Theatrical activities"
  },
  {
    "code": "90012",
    "name": "Concert activities"
  },
  {
    "code": "90013",
    "name": "Circus activities"
  },
  {
    "code": "90020",
    "name": "Activities that promote cultural and entertainment events"
  },
  {
    "code": "90030",
    "name": "Artistic and literary creativity"
  },
  {
    "code": "90040",
    "name": "Activities of concert and theater halls"
  },
  {
    "code": "91011",
    "name": "Activities of film and music libraries"
  },
  {
    "code": "91012",
    "name": "Library activities, including the activities of reading rooms, lecture halls, showrooms"
  },
  {
    "code": "91013",
    "name": "Archive activities"
  },
  {
    "code": "91014",
    "name": "Activities of book chambers"
  },
  {
    "code": "91020",
    "name": "Museum activities"
  },
  {
    "code": "91030",
    "name": "Activities of historical sites and buildings and similar tourist attractions"
  },
  {
    "code": "91041",
    "name": "Activities of botanical gardens and zoos"
  },
  {
    "code": "91042",
    "name": "Activities of nature reserves, wildlife protection"
  },
  {
    "code": "92000",
    "name": "Gambling and betting activities"
  },
  {
    "code": "93110",
    "name": "Operation of sports facilities"
  },
  {
    "code": "93120",
    "name": "Sports clubs activities"
  },
  {
    "code": "93130",
    "name": "Fitness clubs activities"
  },
  {
    "code": "93190",
    "name": "Other sports activities"
  },
  {
    "code": "93210",
    "name": "Activities of entertainment and theme parks"
  },
  {
    "code": "93291",
    "name": "Activities of dance halls, discos"
  },
  {
    "code": "93292",
    "name": "Rodeo activities, shooting galleries"
  },
  {
    "code": "93293",
    "name": "Activities of puppet theaters"
  },
  {
    "code": "93299",
    "name": "Other types of recreation and entertainment activities"
  },
  {
    "code": "94110",
    "name": "Activities of commercial and entrepreneurial public organizations"
  },
  {
    "code": "94120",
    "name": "Activities of professional public organizations"
  },
  {
    "code": "94200",
    "name": "Activities of trade unions"
  },
  {
    "code": "94910",
    "name": "Activities of religious organizations"
  },
  {
    "code": "94920",
    "name": "Activities of political organizations"
  },
  {
    "code": "94990",
    "name": "Activities of other public organizations not included in other groupings"
  },
  {
    "code": "95110",
    "name": "Repair of computers and peripheral equipment"
  },
  {
    "code": "95120",
    "name": "Repair of communication equipment"
  },
  {
    "code": "95210",
    "name": "Repair of electronic household appliances"
  },
  {
    "code": "95220",
    "name": "Repair of household appliances, home and garden equipment"
  },
  {
    "code": "95231",
    "name": "Shoe repair"
  },
  {
    "code": "95232",
    "name": "Repair of travel and haberdashery products made of natural and artificial leather"
  },
  {
    "code": "95240",
    "name": "Repair of furniture and interior items"
  },
  {
    "code": "95251",
    "name": "Repair of wristwatches and other watches and clocks"
  },
  {
    "code": "95252",
    "name": "Jewelry Repair"
  },
  {
    "code": "95291",
    "name": "Repair of knitted and crocheted products"
  },
  {
    "code": "95292",
    "name": "Repair of garments, hats and textile haberdashery products"
  },
  {
    "code": "95293",
    "name": "Repair of fur and leather goods and hats"
  },
  {
    "code": "95294",
    "name": "Repair of musical instruments"
  },
  {
    "code": "95295",
    "name": "Carpet and carpet products repair"
  },
  {
    "code": "95296",
    "name": "Bicycle repair"
  },
  {
    "code": "95299",
    "name": "Repair of other personal items and household goods not included in other groupings"
  },
  {
    "code": "96011",
    "name": "Laundry and laundry processing"
  },
  {
    "code": "96012",
    "name": "Dry cleaning and dyeing"
  },
  {
    "code": "96020",
    "name": "Provision of services by hairdressers and beauty salons"
  },
  {
    "code": "96030",
    "name": "Funeral arrangements and related activities"
  },
  {
    "code": "96040",
    "name": "Physical comfort provision activities"
  },
  {
    "code": "96090",
    "name": "Provision of other individual services not included in other groupings"
  },
  {
    "code": "97000",
    "name": "Activities of households employing domestic workers"
  },
  {
    "code": "98100",
    "name": "Household activities for the production of goods for their own consumption"
  },
  {
    "code": "98200",
    "name": "Activities of households to provide services for their own consumption"
  },
  {
    "code": "99000",
    "name": "Activities of extraterritorial organizations and bodies"
  }
];
